'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, BookOpen, QrCode, Users, ArrowRight, GraduationCap, Play, Sparkles, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  const features = [
    {
      icon: <Box className="w-7 h-7" />,
      title: '3D Viewer Interaktif',
      description: 'Putar, zoom, dan jelajahi objek 3D dengan kontrol sentuh',
      color: 'sky'
    },
    {
      icon: <QrCode className="w-7 h-7" />,
      title: 'Augmented Reality',
      description: 'Lihat objek 3D di dunia nyata melalui kamera',
      color: 'purple'
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: 'Materi Digital',
      description: 'Konten pembelajaran seperti buku dengan navigasi mudah',
      color: 'emerald'
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: 'Quiz Interaktif',
      description: 'Uji pemahaman dengan feedback langsung',
      color: 'amber'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-sky-900">SmartAR Edu</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild className="text-sky-700 hidden sm:flex">
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild className="bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-200">
              <Link href="/register">Daftar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-100 to-purple-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Platform E-Learning dengan AR
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-4 leading-tight">
            Belajar Jadi Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500">Menyenangkan</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-8">
            Visualisasi 3D dan Augmented Reality untuk memahami konsep matematika dengan lebih mudah dan interaktif
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-600 h-14 px-8 text-base shadow-xl shadow-sky-200">
              <Link href="/demo" className="flex items-center gap-2">
                <Play className="w-5 h-5" /> Coba Demo AR
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-sky-200 text-sky-700 h-14 px-8 text-base">
              <Link href="/materi">Lihat Materi</Link>
            </Button>
          </div>
        </div>

        {/* Preview Card */}
        <div className="mt-10 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-400 rounded-3xl blur-2xl opacity-20"></div>
            <Card className="relative border-sky-200 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-sky-100 to-purple-50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Box className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-bold text-sky-900 text-lg mb-1">3D Viewer & AR</h3>
                    <p className="text-sm text-slate-500">Visualisasi bangun ruang interaktif</p>
                    <Button asChild size="sm" className="mt-4 bg-sky-500 hover:bg-sky-600">
                      <Link href="/demo">
                        Coba Sekarang <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-sky-900 mb-8">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-sky-100 hover:shadow-lg hover:border-sky-200 transition-all">
                <CardContent className="p-5 text-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                    feature.color === 'sky' ? 'bg-sky-100 text-sky-600' :
                    feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    feature.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-sky-900 text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-sky-900 mb-2">
            Mulai Belajar
          </h2>
          <p className="text-center text-slate-500 mb-8">Pilih menu untuk memulai</p>
          
          <div className="max-w-2xl mx-auto space-y-3">
            <Link href="/demo">
              <Card className="border-sky-200 bg-gradient-to-r from-sky-50 to-white hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-14 h-14 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                    <Box className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sky-900">Demo 3D & AR</h3>
                    <p className="text-sm text-slate-500">Coba fitur 3D viewer dan Augmented Reality</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-sky-400" />
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/materi">
              <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-white hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sky-900">Materi Pembelajaran</h3>
                    <p className="text-sm text-slate-500">Belajar bangun ruang dengan visualisasi 3D</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-emerald-400" />
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/quiz">
              <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-white hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sky-900">Quiz</h3>
                    <p className="text-sm text-slate-500">Uji pemahaman dengan latihan soal</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-sky-500 to-sky-600 border-0 overflow-hidden">
            <CardContent className="p-8 text-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <Users className="w-12 h-12 text-sky-200 mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Bergabung Sekarang
              </h2>
              <p className="text-sky-100 mb-6 max-w-md mx-auto text-sm">
                Daftar sebagai Guru untuk membuat kelas dan materi, atau Siswa untuk mulai belajar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild className="bg-white text-sky-600 hover:bg-sky-50">
                  <Link href="/register">Daftar Gratis</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/50 text-white hover:bg-white/10">
                  <Link href="/dashboard">Dashboard Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sky-100 py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                <Box className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-sky-900">SmartAR Edu</span>
            </div>
            <p className="text-sm text-slate-500 text-center">
              © 2025 SmartAR Edu. Platform E-Learning dengan Augmented Reality.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/materi" className="text-slate-500 hover:text-sky-600">Materi</Link>
              <Link href="/quiz" className="text-slate-500 hover:text-sky-600">Quiz</Link>
              <Link href="/demo" className="text-slate-500 hover:text-sky-600">Demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
