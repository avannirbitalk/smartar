'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Box, BookOpen, Users, GraduationCap, LogOut, Plus, Settings, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setProfile(user.user_metadata)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Box className="w-12 h-12 text-sky-500 mx-auto animate-pulse" />
          <p className="mt-4 text-slate-600">Memuat...</p>
        </div>
      </div>
    )
  }

  const isGuru = profile?.role === 'guru'

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-sky-900">SmartAR Edu</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 hidden sm:block">
              {profile?.name || user?.email}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${isGuru ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'}`}>
              {isGuru ? 'Guru' : 'Siswa'}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sky-900">Selamat Datang, {profile?.name || 'Pengguna'}!</h1>
          <p className="text-slate-600">Pilih menu di bawah untuk memulai pembelajaran.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Demo 3D/AR */}
          <Link href="/demo">
            <Card className="border-sky-100 hover:shadow-lg transition-all hover:border-sky-300 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-4">
                  <Box className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-bold text-sky-900 mb-2">Demo 3D & AR</h3>
                <p className="text-sm text-slate-600">Coba fitur 3D viewer dan Augmented Reality</p>
                <div className="flex items-center text-sky-600 mt-4 text-sm font-medium">
                  Mulai Demo <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Materi Pembelajaran */}
          <Link href="/materi">
            <Card className="border-sky-100 hover:shadow-lg transition-all hover:border-sky-300 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-sky-900 mb-2">Materi Pembelajaran</h3>
                <p className="text-sm text-slate-600">Pelajari materi bangun ruang dengan visualisasi 3D</p>
                <div className="flex items-center text-sky-600 mt-4 text-sm font-medium">
                  Lihat Materi <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Quiz */}
          <Link href="/quiz">
            <Card className="border-sky-100 hover:shadow-lg transition-all hover:border-sky-300 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-sky-900 mb-2">Quiz</h3>
                <p className="text-sm text-slate-600">Uji pemahaman dengan latihan soal interaktif</p>
                <div className="flex items-center text-sky-600 mt-4 text-sm font-medium">
                  Mulai Quiz <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Guru-specific actions */}
        {isGuru && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-sky-900 mb-4">Menu Guru</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guru/kelas">
                <Card className="border-amber-200 bg-amber-50 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-900">Kelola Kelas</h3>
                      <p className="text-sm text-amber-700">Buat dan kelola kelas Anda</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/guru/materi">
                <Card className="border-amber-200 bg-amber-50 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Plus className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-900">Kelola Materi</h3>
                      <p className="text-sm text-amber-700">Tambah dan edit materi pembelajaran</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}

        {/* Info Card */}
        <Card className="border-sky-100 bg-sky-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-sky-900 mb-2">Tentang SmartAR Edu</h3>
            <p className="text-sm text-slate-600">
              Platform e-learning dengan fitur Augmented Reality untuk pembelajaran interaktif.
              Scan barcode pada objek untuk melihat model 3D di dunia nyata.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
