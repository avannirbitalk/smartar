import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

// In-memory store for OTP codes (for MVP - in production use Redis/DB)
const otpStore = new Map()

// Generate 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

// Create email transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request) {
  try {
    const body = await request.json()
    const { action, email, name, role, otp, password } = body

    // Action: Send OTP
    if (action === 'send_otp') {
      if (!email) {
        return NextResponse.json({ error: 'Email wajib diisi' }, { status: 400 })
      }

      const code = generateOTP()
      const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

      // Store OTP with user data
      otpStore.set(email.toLowerCase(), {
        code,
        name,
        role,
        expiresAt,
        verified: false
      })

      // Send email
      const transporter = createTransporter()
      
      const mailOptions = {
        from: `"SmartAR Edu" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Kode Verifikasi SmartAR Edu',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: #0ea5e9; width: 60px; height: 60px; border-radius: 16px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 24px;">📚</span>
              </div>
              <h1 style="color: #0c4a6e; margin: 0;">SmartAR Edu</h1>
            </div>
            
            <p style="color: #475569; font-size: 16px;">Halo <strong>${name || 'Pengguna'}</strong>,</p>
            <p style="color: #475569; font-size: 16px;">Gunakan kode verifikasi berikut untuk menyelesaikan pendaftaran:</p>
            
            <div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <span style="font-size: 36px; font-weight: bold; color: #0369a1; letter-spacing: 8px;">${code}</span>
            </div>
            
            <p style="color: #64748b; font-size: 14px;">Kode ini berlaku selama 10 menit.</p>
            <p style="color: #64748b; font-size: 14px;">Jika Anda tidak meminta kode ini, abaikan email ini.</p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="color: #94a3b8; font-size: 12px; text-align: center;">© 2025 SmartAR Edu - Platform E-Learning dengan AR</p>
          </div>
        `
      }

      await transporter.sendMail(mailOptions)

      return NextResponse.json({ 
        success: true, 
        message: 'Kode verifikasi telah dikirim ke email Anda' 
      })
    }

    // Action: Verify OTP
    if (action === 'verify_otp') {
      if (!email || !otp) {
        return NextResponse.json({ error: 'Email dan kode OTP wajib diisi' }, { status: 400 })
      }

      const stored = otpStore.get(email.toLowerCase())

      if (!stored) {
        return NextResponse.json({ error: 'Kode verifikasi tidak ditemukan. Silakan minta kode baru.' }, { status: 400 })
      }

      if (Date.now() > stored.expiresAt) {
        otpStore.delete(email.toLowerCase())
        return NextResponse.json({ error: 'Kode verifikasi sudah kadaluarsa. Silakan minta kode baru.' }, { status: 400 })
      }

      if (stored.code !== otp) {
        return NextResponse.json({ error: 'Kode verifikasi salah' }, { status: 400 })
      }

      // Mark as verified
      stored.verified = true
      otpStore.set(email.toLowerCase(), stored)

      return NextResponse.json({ 
        success: true, 
        message: 'Email berhasil diverifikasi' 
      })
    }

    // Action: Complete Registration
    if (action === 'register') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 })
      }

      const stored = otpStore.get(email.toLowerCase())

      if (!stored || !stored.verified) {
        return NextResponse.json({ error: 'Email belum diverifikasi' }, { status: 400 })
      }

      // Create user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: stored.name,
            role: stored.role,
          },
          emailRedirectTo: undefined // Disable email confirmation
        }
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      // Clean up OTP store
      otpStore.delete(email.toLowerCase())

      return NextResponse.json({ 
        success: true, 
        message: 'Pendaftaran berhasil',
        user: data.user
      })
    }

    return NextResponse.json({ error: 'Action tidak valid' }, { status: 400 })

  } catch (error) {
    console.error('Auth API Error:', error)
    return NextResponse.json({ 
      error: error.message || 'Terjadi kesalahan server' 
    }, { status: 500 })
  }
}
