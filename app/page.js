'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { BookOpen, Box, QrCode, Users, ArrowRight, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkUser()
  }, [])

  const features = [
    {
      icon: <Box className="w-8 h-8" />,
      title: '3D Viewer',
      description: 'Visualisasi objek 3D interaktif untuk pemahaman yang lebih baik'
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: 'Augmented Reality',
      description: 'Scan barcode dan lihat objek 3D di dunia nyata'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Materi Interaktif',
      description: 'Konten pembelajaran yang tertata rapi seperti buku digital'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Quiz Online',
      description: 'Evaluasi pemahaman dengan soal-soal interaktif'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-sky-900">SmartAR Edu</span>
          </div>
          <div className="flex gap-2">
            {loading ? (
              <div className="w-20 h-10 bg-sky-100 animate-pulse rounded-lg"></div>
            ) : user ? (
              <Button asChild className="bg-sky-500 hover:bg-sky-600">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-sky-700">
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button asChild className="bg-sky-500 hover:bg-sky-600">
                  <Link href="/register">Daftar</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <QrCode className="w-4 h-4" />
            Pembelajaran dengan Augmented Reality
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-6 leading-tight">
            Belajar Lebih Menyenangkan dengan
            <span className="text-sky-500"> Teknologi AR</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Platform e-learning yang menggabungkan materi pembelajaran interaktif dengan 
            visualisasi 3D dan Augmented Reality untuk pengalaman belajar yang lebih imersif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-600 text-lg h-14 px-8">
              <Link href="/register" className="flex items-center gap-2">
                Mulai Belajar <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-sky-300 text-sky-700 text-lg h-14 px-8">
              <Link href="/demo">Lihat Demo</Link>
            </Button>
          </div>
        </div>

        {/* 3D Preview */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-sky-100 to-sky-50 rounded-3xl p-8 shadow-xl border border-sky-200">
            <div className="aspect-video bg-white rounded-2xl flex items-center justify-center shadow-inner">
              <div className="text-center">
                <Cube className="w-20 h-20 text-sky-400 mx-auto mb-4 animate-pulse" />
                <p className="text-sky-600 font-medium">3D Viewer Preview</p>
                <p className="text-sm text-slate-500 mt-1">Login untuk melihat objek 3D interaktif</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-sky-50/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-sky-900 mb-12">
            Fitur Unggulan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-sky-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-sky-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-sky-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-sky-500 to-sky-600 border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <Users className="w-12 h-12 text-sky-200 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Bergabung Sekarang
              </h2>
              <p className="text-sky-100 mb-6 max-w-xl mx-auto">
                Daftar sebagai Guru untuk membuat kelas dan materi, atau sebagai Siswa untuk mulai belajar.
              </p>
              <Button size="lg" asChild className="bg-white text-sky-600 hover:bg-sky-50">
                <Link href="/register">Daftar Gratis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sky-100 py-8">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>© 2025 SmartAR Edu. Platform E-Learning dengan Augmented Reality.</p>
        </div>
      </footer>
    </div>
  )
}
