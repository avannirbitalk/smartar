'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Box, ArrowLeft, QrCode, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Dynamic import untuk 3D viewer (client-side only)
const Model3DViewer = dynamic(() => import('@/components/Model3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[4/3] bg-sky-50 rounded-xl flex items-center justify-center border-2 border-sky-200">
      <div className="text-center">
        <Box className="w-12 h-12 text-sky-400 mx-auto mb-2 animate-pulse" />
        <p className="text-sm text-slate-500">Memuat 3D Viewer...</p>
      </div>
    </div>
  )
})

const STORAGE_URL = 'https://hmgdlcwzpmbgvfpaiylz.supabase.co/storage/v1/object/public/images'

const models = [
  {
    id: 'kubus',
    name: 'Volume Kubus',
    description: 'Visualisasi kubus yang terbagi menjadi 64 kubus satuan',
    modelUrl: `${STORAGE_URL}/animasi/kubus-64.glb`,
    arUrl: 'https://mywebar.com/p/objek1volumekubus',
    scale: 0.7
  },
  {
    id: 'balok1',
    name: 'Jaring-jaring Balok 1',
    description: 'Animasi jaring-jaring balok yang terbuka',
    modelUrl: `${STORAGE_URL}/animasi/animasi-jaring-balok-1.glb`,
    arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok',
    scale: 1
  },
  {
    id: 'balok2',
    name: 'Jaring-jaring Balok 2',
    description: 'Variasi jaring-jaring balok',
    modelUrl: `${STORAGE_URL}/animasi/animasi-jaring-balok-2.glb`,
    arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok',
    scale: 1
  }
]

export default function DemoPage() {
  const [selectedModel, setSelectedModel] = useState(models[0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-sky-900">Demo 3D & AR</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-sky-900 mb-2">Demo 3D Viewer & AR</h1>
          <p className="text-slate-600">Pilih objek dan coba fitur 3D viewer atau Augmented Reality</p>
        </div>

        {/* 3D Viewer */}
        <div className="max-w-2xl mx-auto mb-6">
          <Model3DViewer
            modelUrl={selectedModel.modelUrl}
            arUrl={selectedModel.arUrl}
            title={selectedModel.name}
            scale={selectedModel.scale}
            showControls={true}
          />
          <p className="text-center text-sm text-slate-600 mt-3">
            <strong>{selectedModel.name}</strong>: {selectedModel.description}
          </p>
        </div>

        {/* Model Selection */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-sky-900 mb-3">Pilih Objek 3D:</h2>
          <div className="grid grid-cols-3 gap-3">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedModel.id === model.id
                    ? 'border-sky-500 bg-sky-50'
                    : 'border-sky-100 bg-white hover:border-sky-300'
                }`}
              >
                <Box className={`w-8 h-8 mx-auto mb-2 ${selectedModel.id === model.id ? 'text-sky-600' : 'text-slate-400'}`} />
                <p className={`text-sm font-medium ${selectedModel.id === model.id ? 'text-sky-900' : 'text-slate-600'}`}>
                  {model.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="max-w-2xl mx-auto mt-8 border-sky-100">
          <CardContent className="p-6">
            <h3 className="font-bold text-sky-900 mb-3">Cara Menggunakan:</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Box className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <strong className="text-sky-900">Mode 3D:</strong> Sentuh dan geser untuk memutar objek. Pinch untuk zoom.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <strong className="text-sky-900">Mode AR:</strong> Tekan tombol AR, izinkan akses kamera, arahkan ke permukaan datar.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button asChild className="bg-sky-500 hover:bg-sky-600">
            <Link href="/materi" className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Lihat Materi Lengkap
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
