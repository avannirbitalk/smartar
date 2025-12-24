'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, BookOpen, Users, GraduationCap, LogOut, ChevronRight, QrCode, Play, Trophy, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function DashboardPage() {
  const [profile, setProfile] = useState({ name: 'Pengguna', role: 'siswa' })

  // For demo purposes - would normally get from auth
  useEffect(() => {
    const savedProfile = localStorage.getItem('demo_profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const isGuru = profile?.role === 'guru'

  const menuItems = [
    {
      href: '/demo',
      icon: <Box className="w-7 h-7" />,
      title: 'Demo 3D & AR',
      desc: 'Coba fitur 3D viewer dan Augmented Reality',
      color: 'sky',
      badge: 'Populer'
    },
    {
      href: '/materi',
      icon: <BookOpen className="w-7 h-7" />,
      title: 'Materi Pembelajaran',
      desc: 'Pelajari bangun ruang dengan visualisasi 3D',
      color: 'emerald'
    },
    {
      href: '/quiz',
      icon: <Trophy className="w-7 h-7" />,
      title: 'Quiz',
      desc: 'Uji pemahaman dengan latihan soal',
      color: 'purple'
    }
  ]

  const guruMenuItems = [
    {
      href: '/guru/materi',
      icon: <Settings className="w-6 h-6" />,
      title: 'Kelola Materi',
      desc: 'Tambah dan edit materi pembelajaran'
    },
    {
      href: '/guru/quiz',
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Kelola Quiz',
      desc: 'Buat dan kelola soal-soal quiz'
    },
    {
      href: '/guru/kelas',
      icon: <Users className="w-6 h-6" />,
      title: 'Kelola Kelas',
      desc: 'Lihat progress siswa'
    }
  ]

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
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isGuru ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
            }`}>
              {isGuru ? 'Guru' : 'Siswa'}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-6 mb-6 text-white">
          <h1 className="text-xl font-bold mb-1">Selamat Datang! 👋</h1>
          <p className="text-sky-100 text-sm">Pilih menu di bawah untuk mulai belajar dengan teknologi AR</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center border border-sky-100">
            <div className="text-2xl font-bold text-sky-600">3</div>
            <div className="text-xs text-slate-500">Model 3D</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-sky-100">
            <div className="text-2xl font-bold text-emerald-600">10</div>
            <div className="text-xs text-slate-500">Halaman Materi</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-sky-100">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-xs text-slate-500">Soal Quiz</div>
          </div>
        </div>

        {/* Main Menu */}
        <h2 className="font-bold text-sky-900 mb-3">Menu Utama</h2>
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="border-sky-100 hover:shadow-lg hover:border-sky-300 transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    item.color === 'sky' ? 'bg-sky-100 text-sky-600' :
                    item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sky-900">{item.title}</h3>
                      {item.badge && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Guru Menu */}
        {isGuru && (
          <>
            <h2 className="font-bold text-amber-800 mb-3">Menu Guru</h2>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {guruMenuItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <Card className="border-amber-200 bg-amber-50 hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900">{item.title}</h3>
                        <p className="text-sm text-amber-700">{item.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-amber-400" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* AR Feature Highlight */}
        <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-white overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sky-900 mb-1">Fitur Augmented Reality</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Lihat objek 3D di dunia nyata! Tekan tombol AR pada 3D viewer untuk memulai.
                </p>
                <Button asChild size="sm" className="bg-sky-500 hover:bg-sky-600">
                  <Link href="/demo" className="flex items-center gap-2">
                    <Play className="w-4 h-4" /> Coba Sekarang
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Mode Notice */}
        <div className="mt-6 p-4 bg-slate-100 rounded-xl text-center">
          <p className="text-sm text-slate-600">
            Mode Demo - <button onClick={() => {
              const newRole = profile.role === 'guru' ? 'siswa' : 'guru'
              const newProfile = { ...profile, role: newRole }
              setProfile(newProfile)
              localStorage.setItem('demo_profile', JSON.stringify(newProfile))
            }} className="text-sky-600 font-medium hover:underline">
              Ganti ke {profile.role === 'guru' ? 'Siswa' : 'Guru'}
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}
