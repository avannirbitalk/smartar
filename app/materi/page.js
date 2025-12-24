'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Box, ArrowLeft, ChevronLeft, ChevronRight, BookOpen, Play, QrCode, Youtube, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import FileAttachment from '@/components/FileAttachment'
import { RenderLatex } from '@/components/LaTeX'

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

// Comprehensive materi content with LaTeX, Video, and File support
const materiPages = [
  {
    id: 1,
    chapter: 'Pendahuluan',
    title: 'Bangun Ruang Sisi Datar',
    contentType: 'text',
    content: `
      <div class="chapter-intro">
        <h1>BAB 1</h1>
        <h2>Bangun Ruang Sisi Datar</h2>
      </div>
      <div class="learning-goals">
        <h3>🎯 Tujuan Pembelajaran</h3>
        <p>Setelah mempelajari bab ini, kamu diharapkan mampu:</p>
        <ol>
          <li>Memahami pengertian bangun ruang sisi datar</li>
          <li>Menghitung volume kubus dan balok</li>
          <li>Menghitung luas permukaan kubus dan balok</li>
          <li>Memahami jaring-jaring kubus dan balok</li>
        </ol>
      </div>
      <div class="intro-text">
        <p><strong>Bangun ruang sisi datar</strong> adalah bangun tiga dimensi yang dibatasi oleh bidang-bidang datar. Contoh bangun ruang sisi datar adalah kubus, balok, prisma, dan limas.</p>
        <p>Dalam kehidupan sehari-hari, kita sering menemukan benda-benda berbentuk bangun ruang. Misalnya, kotak pensil berbentuk balok, dadu berbentuk kubus, dan atap rumah berbentuk limas atau prisma.</p>
      </div>
    `
  },
  {
    id: 2,
    chapter: 'Kubus',
    title: 'Pengertian Kubus',
    contentType: 'text',
    content: `
      <h2>A. Pengertian Kubus</h2>
      <div class="definition-box">
        <p><strong>Kubus</strong> adalah bangun ruang yang dibatasi oleh enam bidang sisi yang kongruen berbentuk persegi.</p>
      </div>
      <h3>Unsur-unsur Kubus:</h3>
      <ul>
        <li><strong>Sisi:</strong> Bidang yang membatasi kubus. Kubus memiliki 6 sisi berbentuk persegi yang kongruen.</li>
        <li><strong>Rusuk:</strong> Garis potong antara dua sisi kubus. Kubus memiliki 12 rusuk yang sama panjang.</li>
        <li><strong>Titik Sudut:</strong> Titik potong antara tiga rusuk. Kubus memiliki 8 titik sudut.</li>
        <li><strong>Diagonal Sisi:</strong> Ruas garis yang menghubungkan dua titik sudut yang berhadapan pada sisi kubus.</li>
        <li><strong>Diagonal Ruang:</strong> Ruas garis yang menghubungkan dua titik sudut yang berhadapan dalam ruang kubus.</li>
      </ul>
    `
  },
  {
    id: 3,
    chapter: 'Kubus',
    title: 'Volume Kubus',
    contentType: 'text',
    content: `
      <h2>B. Volume Kubus</h2>
      <p>Volume adalah ukuran banyaknya ruang yang dapat ditempati oleh suatu bangun ruang.</p>
      <p>Untuk menghitung volume kubus, kita menggunakan rumus:</p>
    `,
    latex: '$$V = s \\times s \\times s = s^3$$',
    latexNote: 'di mana $s$ adalah panjang sisi (rusuk) kubus',
    afterContent: `<p>Perhatikan visualisasi kubus di bawah ini. Kubus tersebut terbagi menjadi 64 kubus satuan ($4 \\times 4 \\times 4$), yang menunjukkan bahwa volumenya adalah $64$ satuan kubik.</p>`,
    model: {
      modelUrl: `${STORAGE_URL}/animasi/kubus-64.glb`,
      arUrl: 'https://mywebar.com/p/objek1volumekubus',
      title: 'Volume Kubus 4×4×4',
      scale: 0.7
    }
  },
  {
    id: 4,
    chapter: 'Kubus',
    title: 'Contoh Soal Volume Kubus',
    contentType: 'text',
    content: `
      <h2>Contoh Soal Volume Kubus</h2>
      <div class="example-box">
        <h4>Contoh 1:</h4>
        <p>Sebuah kubus memiliki panjang rusuk 5 cm. Hitunglah volume kubus tersebut!</p>
        <div class="solution">
          <h4>Penyelesaian:</h4>
          <p>Diketahui: $s = 5$ cm</p>
          <p>Ditanya: $V = ?$</p>
          <p>Jawab:</p>
        </div>
      </div>
    `,
    latex: '$$V = s^3 = 5^3 = 5 \\times 5 \\times 5 = 125 \\text{ cm}^3$$',
    afterContent: `
      <div class="example-box">
        <h4>Contoh 2:</h4>
        <p>Volume sebuah kubus adalah $343$ cm³. Berapakah panjang rusuk kubus tersebut?</p>
        <div class="solution">
          <h4>Penyelesaian:</h4>
          <p>Diketahui: $V = 343$ cm³</p>
          <p>Ditanya: $s = ?$</p>
          <p>Jawab: $s = \\sqrt[3]{V} = \\sqrt[3]{343} = 7$ cm</p>
        </div>
      </div>
    `
  },
  {
    id: 5,
    chapter: 'Kubus',
    title: 'Video: Cara Menghitung Volume Kubus',
    contentType: 'video',
    content: `
      <h2>Video Pembelajaran</h2>
      <p>Tonton video berikut untuk memahami cara menghitung volume kubus dengan lebih jelas:</p>
    `,
    videoUrl: 'https://www.youtube.com/watch?v=hDSEX0RFBUU',
    videoTitle: 'Cara Menghitung Volume Kubus'
  },
  {
    id: 6,
    chapter: 'Balok',
    title: 'Pengertian Balok',
    contentType: 'text',
    content: `
      <h2>C. Pengertian Balok</h2>
      <div class="definition-box">
        <p><strong>Balok</strong> adalah bangun ruang yang dibatasi oleh enam bidang sisi berbentuk persegi panjang, dengan sisi-sisi yang berhadapan kongruen.</p>
      </div>
      <h3>Unsur-unsur Balok:</h3>
      <ul>
        <li><strong>Sisi:</strong> Balok memiliki 6 sisi berbentuk persegi panjang. Sisi-sisi yang berhadapan kongruen.</li>
        <li><strong>Rusuk:</strong> Balok memiliki 12 rusuk yang terdiri dari 4 rusuk panjang ($p$), 4 rusuk lebar ($l$), dan 4 rusuk tinggi ($t$).</li>
        <li><strong>Titik Sudut:</strong> Balok memiliki 8 titik sudut.</li>
      </ul>
      <h3>Perbedaan Kubus dan Balok:</h3>
      <p>Kubus adalah balok khusus yang memiliki panjang, lebar, dan tinggi sama ($p = l = t$).</p>
    `
  },
  {
    id: 7,
    chapter: 'Balok',
    title: 'Volume Balok',
    contentType: 'text',
    content: `
      <h2>D. Volume Balok</h2>
      <p>Volume balok dihitung dengan mengalikan panjang, lebar, dan tinggi balok:</p>
    `,
    latex: '$$V = p \\times l \\times t$$',
    latexNote: 'di mana $p$ = panjang, $l$ = lebar, $t$ = tinggi',
    afterContent: `
      <div class="example-box">
        <h4>Contoh:</h4>
        <p>Sebuah balok memiliki panjang 8 cm, lebar 5 cm, dan tinggi 4 cm. Hitunglah volume balok tersebut!</p>
        <div class="solution">
          <h4>Penyelesaian:</h4>
          <p>$V = p \\times l \\times t$</p>
          <p>$V = 8 \\times 5 \\times 4 = 160$ cm³</p>
        </div>
      </div>
    `
  },
  {
    id: 8,
    chapter: 'Balok',
    title: 'Luas Permukaan Balok',
    contentType: 'text',
    content: `
      <h2>E. Luas Permukaan Balok</h2>
      <p>Luas permukaan balok adalah jumlah luas seluruh sisi balok.</p>
      <p>Untuk memahami luas permukaan, kita perlu memahami <strong>jaring-jaring balok</strong> terlebih dahulu.</p>
      <div class="info-box">
        <p>💡 <strong>Jaring-jaring</strong> adalah bentuk dua dimensi yang jika dilipat akan membentuk bangun ruang.</p>
      </div>
      <p>Perhatikan animasi jaring-jaring balok di bawah ini. Tekan tombol <strong>Play</strong> untuk melihat animasi, dan tombol <strong>AR</strong> untuk melihat dalam Augmented Reality!</p>
    `,
    model: {
      modelUrl: `${STORAGE_URL}/animasi/animasi-jaring-balok-1.glb`,
      arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok',
      title: 'Jaring-jaring Balok',
      scale: 1
    }
  },
  {
    id: 9,
    chapter: 'Balok',
    title: 'Rumus Luas Permukaan Balok',
    contentType: 'text',
    content: `
      <h2>Rumus Luas Permukaan Balok</h2>
      <p>Dari jaring-jaring balok, kita dapat melihat bahwa balok memiliki 3 pasang sisi yang kongruen:</p>
      <ul>
        <li>2 sisi dengan luas $p \\times l$ (atas dan bawah)</li>
        <li>2 sisi dengan luas $p \\times t$ (depan dan belakang)</li>
        <li>2 sisi dengan luas $l \\times t$ (kiri dan kanan)</li>
      </ul>
    `,
    latex: '$$L = 2(pl + pt + lt)$$',
    latexNote: 'di mana $p$ = panjang, $l$ = lebar, $t$ = tinggi',
    afterContent: `
      <div class="example-box">
        <h4>Contoh:</h4>
        <p>Sebuah balok memiliki panjang 8 cm, lebar 5 cm, dan tinggi 4 cm. Hitunglah luas permukaannya!</p>
        <div class="solution">
          <h4>Penyelesaian:</h4>
          <p>$L = 2(pl + pt + lt)$</p>
          <p>$L = 2(8 \\times 5 + 8 \\times 4 + 5 \\times 4)$</p>
          <p>$L = 2(40 + 32 + 20)$</p>
          <p>$L = 2(92) = 184$ cm²</p>
        </div>
      </div>
    `
  },
  {
    id: 10,
    chapter: 'Balok',
    title: 'Variasi Jaring-jaring Balok',
    contentType: 'text',
    content: `
      <h2>Variasi Jaring-jaring Balok</h2>
      <p>Jaring-jaring balok memiliki beberapa variasi bentuk. Berikut adalah variasi lain dari jaring-jaring balok:</p>
      <div class="info-box">
        <p>🔍 Meskipun bentuknya berbeda, semua variasi jaring-jaring akan membentuk balok yang sama jika dilipat.</p>
      </div>
      <p>Tekan tombol <strong>Play</strong> untuk melihat animasi pelipatan jaring-jaring!</p>
    `,
    model: {
      modelUrl: `${STORAGE_URL}/animasi/animasi-jaring-balok-2.glb`,
      arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok',
      title: 'Variasi Jaring-jaring Balok',
      scale: 1
    }
  },
  {
    id: 11,
    chapter: 'Rangkuman',
    title: 'Rangkuman Materi',
    contentType: 'text',
    content: `
      <h2>📝 Rangkuman</h2>
      <div class="summary-box">
        <h3>Kubus</h3>
        <ul>
          <li>Bangun ruang dengan 6 sisi persegi kongruen</li>
          <li>Memiliki 12 rusuk sama panjang dan 8 titik sudut</li>
          <li>Volume: $V = s^3$</li>
          <li>Luas Permukaan: $L = 6s^2$</li>
        </ul>
      </div>
      <div class="summary-box">
        <h3>Balok</h3>
        <ul>
          <li>Bangun ruang dengan 6 sisi persegi panjang</li>
          <li>Sisi-sisi berhadapan kongruen</li>
          <li>Volume: $V = p \\times l \\times t$</li>
          <li>Luas Permukaan: $L = 2(pl + pt + lt)$</li>
        </ul>
      </div>
      <div class="next-step">
        <p>🎯 Selanjutnya, uji pemahamanmu dengan mengerjakan <strong>Quiz</strong>!</p>
      </div>
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

  const goToPage = (index) => {
    setCurrentPage(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Render content with LaTeX support
  const renderContent = (html) => {
    if (!html) return null
    return <RenderLatex content={html} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Kembali</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" />
              <span className="font-bold text-sky-900">Materi</span>
            </div>
            <span className="text-sm text-slate-600 bg-sky-100 px-2 py-1 rounded-full">
              {currentPage + 1}/{materiPages.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 pb-28">
        <div className="max-w-2xl mx-auto">
          {/* Chapter & Page Title */}
          <div className="text-center mb-6">
            <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full">
              {page.chapter}
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-sky-900 mt-3">{page.title}</h1>
          </div>

          {/* Content Card */}
          <Card className="border-sky-100 shadow-lg mb-6 overflow-hidden">
            <CardContent className="p-5 md:p-8">
              <div className="materi-content">
                {renderContent(page.content)}
              </div>
              
              {/* LaTeX Display */}
              {page.latex && (
                <div className="my-6">
                  <div className="formula-box">
                    <RenderLatex content={page.latex} />
                  </div>
                  {page.latexNote && (
                    <p className="text-center text-sm text-slate-600 mt-2">
                      <RenderLatex content={page.latexNote} />
                    </p>
                  )}
                </div>
              )}

              {/* After Content */}
              {page.afterContent && (
                <div className="materi-content mt-4">
                  {renderContent(page.afterContent)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Embed */}
          {page.contentType === 'video' && page.videoUrl && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Youtube className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-sky-900">{page.videoTitle || 'Video Pembelajaran'}</span>
              </div>
              <YouTubeEmbed url={page.videoUrl} title={page.videoTitle} />
            </div>
          )}

          {/* File Attachment */}
          {page.contentType === 'file' && page.fileUrl && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-sky-900">File Lampiran</span>
              </div>
              <FileAttachment 
                url={page.fileUrl} 
                filename={page.fileName}
                size={page.fileSize}
              />
            </div>
          )}

          {/* 3D Model */}
          {page.model && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Box className="w-5 h-5 text-sky-600" />
                <span className="font-semibold text-sky-900">Visualisasi 3D</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">
                  Interaktif
                </span>
              </div>
              <Model3DViewer
                modelUrl={page.model.modelUrl}
                arUrl={page.model.arUrl}
                title={page.model.title}
                scale={page.model.scale}
                showControls={true}
              />
              <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" /> Play animasi
                </span>
                <span className="flex items-center gap-1">
                  <QrCode className="w-4 h-4" /> Mode AR
                </span>
              </div>
            </div>
          )}

          {/* Last page CTA */}
          {currentPage === materiPages.length - 1 && (
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8 text-lg">
                <Link href="/quiz">🎯 Mulai Quiz</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-sky-100 p-4">
        <div className="container mx-auto max-w-2xl">
          {/* Page dots */}
          <div className="flex justify-center gap-1.5 mb-3">
            {materiPages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPage 
                    ? 'bg-sky-500 w-6' 
                    : index < currentPage 
                      ? 'bg-sky-300' 
                      : 'bg-sky-200'
                }`}
              />
            ))}
          </div>
          {/* Nav buttons */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentPage === 0}
              className="flex-1 h-12 border-sky-200"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Sebelumnya
            </Button>
            <Button
              onClick={goNext}
              disabled={currentPage === materiPages.length - 1}
              className="flex-1 h-12 bg-sky-500 hover:bg-sky-600"
            >
              Selanjutnya
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content Styles */}
      <style jsx global>{`
        .materi-content h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0369a1;
          margin-bottom: 0.5rem;
        }
        .materi-content h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0c4a6e;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e0f2fe;
        }
        .materi-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0369a1;
          margin: 1.25rem 0 0.75rem;
        }
        .materi-content h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #0c4a6e;
          margin-bottom: 0.5rem;
        }
        .materi-content p {
          color: #475569;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .materi-content ul, .materi-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #475569;
        }
        .materi-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .materi-content ol {
          list-style-type: decimal;
        }
        .materi-content ul {
          list-style-type: disc;
        }
        .chapter-intro {
          text-align: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-radius: 1rem;
          margin-bottom: 1.5rem;
        }
        .chapter-intro h1 {
          font-size: 0.875rem;
          color: #0ea5e9;
          margin-bottom: 0.25rem;
        }
        .chapter-intro h2 {
          font-size: 1.5rem;
          border: none;
          padding: 0;
          margin: 0;
        }
        .learning-goals {
          background: #fefce8;
          border: 1px solid #fef08a;
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
        }
        .learning-goals h3 {
          color: #a16207;
          margin-top: 0;
        }
        .definition-box {
          background: #f0f9ff;
          border-left: 4px solid #0ea5e9;
          padding: 1rem 1.25rem;
          border-radius: 0 0.5rem 0.5rem 0;
          margin: 1rem 0;
        }
        .definition-box p {
          margin: 0;
          color: #0c4a6e;
        }
        .formula-box {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #7dd3fc;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          font-size: 1.25rem;
          color: #0369a1;
        }
        .example-box {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.25rem;
          margin: 1rem 0;
        }
        .example-box h4 {
          color: #0ea5e9;
        }
        .solution {
          background: #f8fafc;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-top: 1rem;
        }
        .solution h4 {
          color: #10b981;
          margin-bottom: 0.75rem;
        }
        .solution p {
          margin-bottom: 0.5rem;
        }
        .info-box {
          background: #ecfeff;
          border: 1px solid #a5f3fc;
          border-radius: 0.75rem;
          padding: 1rem;
          margin: 1rem 0;
        }
        .info-box p {
          margin: 0;
          color: #0e7490;
        }
        .summary-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          margin: 1rem 0;
        }
        .summary-box h3 {
          color: #0ea5e9;
          margin-top: 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .next-step {
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          border-radius: 0.75rem;
          padding: 1rem;
          text-align: center;
          margin-top: 1.5rem;
        }
        .next-step p {
          margin: 0;
          color: #166534;
          font-weight: 500;
        }
        /* KaTeX styling */
        .katex {
          font-size: 1.1em;
        }
        .katex-display {
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  )
}
