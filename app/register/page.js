'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Box, Mail, Lock, Eye, EyeOff, ArrowLeft, User, GraduationCap, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('siswa')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!name.trim()) {
      setError('Nama lengkap wajib diisi')
      setLoading(false)
      return
    }

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
      // Register directly with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (signUpError) throw signUpError

      // Check if user was created and can login immediately
      // (Supabase allows immediate login if email confirmation is disabled)
      if (data.user && !data.user.email_confirmed_at) {
        // Try to sign in immediately
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (!signInError) {
          router.push('/dashboard')
          router.refresh()
          return
        }
      }

      // If immediate login not possible, show success message
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
        <header className="p-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-sky-100 text-center shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-sky-900 mb-2">Pendaftaran Berhasil!</h2>
              <p className="text-slate-600 mb-6">
                Akun Anda telah dibuat. Silakan cek email <strong className="text-sky-700">{email}</strong> untuk verifikasi, atau langsung login.
              </p>
              <Button asChild className="bg-sky-500 hover:bg-sky-600 w-full">
                <Link href="/login">Masuk Sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
            <CardDescription>Buat akun SmartAR Edu baru</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
                {loading ? 'Mendaftar...' : 'Daftar'}
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
