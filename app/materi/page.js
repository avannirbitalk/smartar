'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Box, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

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

// Sample materi content
const materiPages = [
  {
    id: 1,
    title: 'Pendahuluan Bangun Ruang',
    content: `
      <h2>Bangun Ruang Sisi Datar</h2>
      <p>Bangun ruang sisi datar adalah bangun tiga dimensi yang memiliki sisi-sisi berbentuk bidang datar (bukan lengkung).</p>
      <p>Dalam materi ini, kita akan mempelajari:</p>
      <ul>
        <li>Kubus dan balok</li>
        <li>Luas permukaan</li>
        <li>Volume bangun ruang</li>
      </ul>
      <p>Setiap materi dilengkapi dengan visualisasi 3D dan fitur Augmented Reality untuk membantu pemahaman.</p>
    `
  },
  {
    id: 2,
    title: 'Volume Kubus',
    content: `
      <h2>A. Volume Kubus</h2>
      <p>Kubus adalah bangun ruang yang dibatasi oleh enam bidang sisi yang kongruen berbentuk persegi.</p>
      <p>Volume kubus dapat dihitung dengan rumus:</p>
      <div class="formula">V = r³</div>
      <p>di mana <strong>r</strong> adalah panjang rusuk kubus.</p>
      <p>Perhatikan visualisasi kubus di bawah ini. Kubus tersebut terbagi menjadi 64 kubus satuan (4 × 4 × 4).</p>
    `,
    model: {
      modelUrl: `${STORAGE_URL}/animasi/kubus-64.glb`,
      arUrl: 'https://mywebar.com/p/objek1volumekubus',
      title: 'Objek 1. Volume Kubus',
      scale: 0.7
    }
  },
  {
    id: 3,
    title: 'Luas Permukaan Balok',
    content: `
      <h2>B. Luas Permukaan Balok</h2>
      <p>Balok adalah bangun ruang yang dibatasi oleh enam bidang sisi berbentuk persegi panjang, dengan sisi-sisi yang berhadapan kongruen.</p>
      <p>Untuk menghitung luas permukaan balok, kita perlu memahami jaring-jaring balok terlebih dahulu.</p>
      <p>Perhatikan animasi jaring-jaring balok di bawah ini:</p>
    `,
    model: {
      modelUrl: `${STORAGE_URL}/animasi/animasi-jaring-balok-1.glb`,
      arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok',
      title: 'Objek 7. Jaring-jaring Balok',
      scale: 1
    }
  },
  {
    id: 4,
    title: 'Rumus Luas Permukaan Balok',
    content: `
      <h2>Rumus Luas Permukaan Balok</h2>
      <p>Dari jaring-jaring balok, dapat disimpulkan bahwa luas permukaan balok adalah jumlah luas keenam sisinya:</p>
      <div class="formula">L = 2(pl + pt + lt)</div>
      <p>di mana:</p>
      <ul>
        <li><strong>p</strong> = panjang</li>
        <li><strong>l</strong> = lebar</li>
        <li><strong>t</strong> = tinggi</li>
      </ul>
      <p><strong>Contoh:</strong></p>
      <p>Sebuah balok memiliki panjang 8 cm, lebar 5 cm, dan tinggi 4 cm. Hitunglah luas permukaannya!</p>
      <p><strong>Penyelesaian:</strong></p>
      <div class="formula">L = 2(8×5 + 8×4 + 5×4) = 2(40 + 32 + 20) = 2(92) = 184 cm²</div>
    `
  },
  {
    id: 5,
    title: 'Rangkuman',
    content: `
      <h2>Rangkuman Materi</h2>
      <p>Setelah mempelajari materi ini, kamu telah memahami:</p>
      <ul>
        <li><strong>Volume Kubus:</strong> V = r³</li>
        <li><strong>Luas Permukaan Balok:</strong> L = 2(pl + pt + lt)</li>
        <li>Jaring-jaring adalah bentuk datar yang jika dilipat akan membentuk bangun ruang</li>
      </ul>
      <p>Selanjutnya, kerjakan quiz untuk menguji pemahamanmu!</p>
    `
  }
]

export default function MateriPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const page = materiPages[currentPage]
  const progress = ((currentPage + 1) / materiPages.length) * 100

  const goNext = () => {
    if (currentPage < materiPages.length - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/dashboard" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" />
              <span className="font-bold text-sky-900">Materi</span>
            </div>
            <span className="text-sm text-slate-600">
              {currentPage + 1} / {materiPages.length}
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-6">
            <span className="bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1 rounded-full">
              Halaman {currentPage + 1}
            </span>
            <h1 className="text-xl font-bold text-sky-900 mt-3">{page.title}</h1>
          </div>

          {/* Content Card - Book-like appearance */}
          <Card className="border-sky-100 shadow-lg mb-6">
            <CardContent className="p-6">
              <div 
                className="materi-content"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </CardContent>
          </Card>

          {/* 3D Model if exists */}
          {page.model && (
            <div className="mb-6">
              <Model3DViewer
                modelUrl={page.model.modelUrl}
                arUrl={page.model.arUrl}
                title={page.model.title}
                scale={page.model.scale}
                showControls={true}
              />
              <p className="text-center text-sm text-slate-500 mt-2">
                {page.model.title}
              </p>
            </div>
          )}

          {/* Last page CTA */}
          {currentPage === materiPages.length - 1 && (
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                <Link href="/quiz">Mulai Quiz</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-sky-100 p-4">
        <div className="container mx-auto max-w-2xl flex justify-between">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentPage === 0}
            className="border-sky-200"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Sebelumnya
          </Button>
          <Button
            onClick={goNext}
            disabled={currentPage === materiPages.length - 1}
            className="bg-sky-500 hover:bg-sky-600"
          >
            Selanjutnya
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </nav>

      {/* Styles for content */}
      <style jsx global>{`
        .materi-content h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0c4a6e;
          margin-bottom: 1rem;
        }
        .materi-content p {
          color: #475569;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .materi-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #475569;
        }
        .materi-content li {
          margin-bottom: 0.5rem;
        }
        .materi-content .formula {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 0.5rem;
          padding: 1rem;
          text-align: center;
          font-size: 1.125rem;
          font-weight: 600;
          color: #0369a1;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  )
}
