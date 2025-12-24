'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Box, Mail, Lock, Eye, EyeOff, ArrowLeft, User, GraduationCap, BookOpen, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export default function RegisterPage() {
  const [step, setStep] = useState(1) // 1: email, 2: verify code, 3: create password
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('siswa')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const router = useRouter()
  const supabase = createClient()

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!name.trim()) {
      setError('Nama lengkap wajib diisi')
      setLoading(false)
      return
    }

    try {
      // Use Supabase OTP sign in (will create user if not exists)
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: {
            name,
            role,
          }
        }
      })

      if (error) throw error

      // Move to OTP verification step
      setStep(2)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mengirim kode')
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP code
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (otpCode.length !== 6) {
      setError('Masukkan kode verifikasi 6 digit')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'email'
      })

      if (error) throw error

      // Move to password creation step
      setStep(3)
    } catch (err) {
      setError(err.message || 'Kode verifikasi salah')
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Set password
  const handleSetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      // Success - redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat membuat password')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: {
            name,
            role,
          }
        }
      })

      if (error) throw error
      setError('')
      alert('Kode verifikasi baru telah dikirim ke email Anda')
    } catch (err) {
      setError(err.message || 'Gagal mengirim ulang kode')
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP Screen
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
        <header className="p-4">
          <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-sky-100 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-10 h-10 text-sky-500" />
              </div>
              <CardTitle className="text-2xl text-sky-900">Verifikasi Email</CardTitle>
              <CardDescription>
                Masukkan kode 6 digit yang dikirim ke<br/>
                <strong className="text-sky-700">{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                {error && (
                  <div className="bg-pink-50 border border-pink-200 text-pink-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={(value) => setOtpCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-xl border-sky-200" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-xl border-sky-200" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-xl border-sky-200" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-xl border-sky-200" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-xl border-sky-200" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-xl border-sky-200" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 h-12 rounded-xl text-base"
                  disabled={loading || otpCode.length !== 6}
                >
                  {loading ? 'Memverifikasi...' : 'Verifikasi'}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-600 mb-2">Tidak menerima kode?</p>
                <button
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sky-600 hover:text-sky-700 font-medium text-sm"
                >
                  Kirim Ulang Kode
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Step 3: Create Password Screen
  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
        <header className="p-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-sky-100 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-sky-900">Buat Password</CardTitle>
              <CardDescription>
                Email terverifikasi! Silakan buat password untuk akun Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetPassword} className="space-y-4">
                {error && (
                  <div className="bg-pink-50 border border-pink-200 text-pink-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password Baru</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Minimal 6 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-sky-200 focus:border-sky-500 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ulangi password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-12 border-sky-200 focus:border-sky-500 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 h-12 rounded-xl text-base"
                  disabled={loading}
                >
                  {loading ? 'Menyimpan...' : 'Selesaikan Pendaftaran'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Step 1: Email & Info Form
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </Link>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-4 pb-8">
        <Card className="w-full max-w-md border-sky-100 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Box className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-sky-900">Daftar Akun</CardTitle>
            <CardDescription>Langkah 1: Masukkan data diri</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendOTP} className="space-y-4">
              {error && (
                <div className="bg-pink-50 border border-pink-200 text-pink-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div className="space-y-3">
                <Label>Daftar sebagai</Label>
                <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="siswa" id="siswa" className="peer sr-only" />
                    <Label
                      htmlFor="siswa"
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-sky-200 bg-white p-4 hover:bg-sky-50 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 cursor-pointer transition-all"
                    >
                      <GraduationCap className="w-8 h-8 mb-2 text-sky-600" />
                      <span className="font-medium text-sky-900">Siswa</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="guru" id="guru" className="peer sr-only" />
                    <Label
                      htmlFor="guru"
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-sky-200 bg-white p-4 hover:bg-sky-50 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50 cursor-pointer transition-all"
                    >
                      <BookOpen className="w-8 h-8 mb-2 text-sky-600" />
                      <span className="font-medium text-sky-900">Guru</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 border-sky-200 focus:border-sky-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-sky-200 focus:border-sky-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 h-12 rounded-xl text-base"
                disabled={loading}
              >
                {loading ? 'Mengirim kode...' : 'Kirim Kode Verifikasi'}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-600 mt-6">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-sky-600 hover:text-sky-700 font-medium">
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
