'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, Plus, Edit, Trash2, BookOpen, Box, Eye, Save, X, Youtube, FileText, Type, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FileUploader from '@/components/FileUploader'
import FileAttachment from '@/components/FileAttachment'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { RenderLatex } from '@/components/LaTeX'

const STORAGE_URL = 'https://hmgdlcwzpmbgvfpaiylz.supabase.co/storage/v1/object/public/images'

// Available 3D models
const available3DModels = [
  { id: 'kubus-64', name: 'Volume Kubus 4x4x4', url: `${STORAGE_URL}/animasi/kubus-64.glb`, arUrl: 'https://mywebar.com/p/objek1volumekubus' },
  { id: 'balok-1', name: 'Jaring-jaring Balok 1', url: `${STORAGE_URL}/animasi/animasi-jaring-balok-1.glb`, arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok' },
  { id: 'balok-2', name: 'Jaring-jaring Balok 2', url: `${STORAGE_URL}/animasi/animasi-jaring-balok-2.glb`, arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok' },
]

// Sample materi data
const initialMateri = [
  { id: 1, title: 'Pendahuluan Bangun Ruang', chapter: 'Pendahuluan', hasModel: false, type: 'text' },
  { id: 2, title: 'Pengertian Kubus', chapter: 'Kubus', hasModel: false, type: 'text' },
  { id: 3, title: 'Volume Kubus', chapter: 'Kubus', hasModel: true, modelId: 'kubus-64', type: '3d' },
  { id: 4, title: 'Video: Cara Menghitung Volume', chapter: 'Kubus', hasModel: false, type: 'video', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 5, title: 'Pengertian Balok', chapter: 'Balok', hasModel: false, type: 'text' },
  { id: 6, title: 'Luas Permukaan Balok', chapter: 'Balok', hasModel: true, modelId: 'balok-1', type: '3d' },
  { id: 7, title: 'Modul PDF: Latihan Soal', chapter: 'Balok', hasModel: false, type: 'file', fileUrl: '#', fileName: 'latihan-soal.pdf' },
  { id: 8, title: 'Rangkuman Materi', chapter: 'Rangkuman', hasModel: false, type: 'text' },
]

export default function GuruMateriPage() {
  const [materi, setMateri] = useState(initialMateri)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [previewLatex, setPreviewLatex] = useState('')
  const [formData, setFormData] = useState({ 
    title: '', 
    chapter: '', 
    content: '', 
    modelId: '',
    videoUrl: '',
    fileUrl: '',
    fileName: '',
    contentType: 'text' // text, video, file, 3d
  })

  const handleAdd = () => {
    const newMateri = {
      id: Date.now(),
      title: formData.title,
      chapter: formData.chapter,
      type: formData.contentType,
      hasModel: formData.contentType === '3d' && !!formData.modelId,
      modelId: formData.modelId || null,
      videoUrl: formData.videoUrl || null,
      fileUrl: formData.fileUrl || null,
      fileName: formData.fileName || null,
      content: formData.content || null
    }
    setMateri([...materi, newMateri])
    resetForm()
    setIsAddOpen(false)
  }

  const resetForm = () => {
    setFormData({ 
      title: '', 
      chapter: '', 
      content: '', 
      modelId: '',
      videoUrl: '',
      fileUrl: '',
      fileName: '',
      contentType: 'text'
    })
    setPreviewLatex('')
  }

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus materi ini?')) {
      setMateri(materi.filter(m => m.id !== id))
    }
  }

  const handleFileUpload = (file) => {
    setFormData({
      ...formData, 
      fileUrl: file.url, 
      fileName: file.filename
    })
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Youtube className="w-4 h-4 text-red-500" />
      case 'file': return <FileText className="w-4 h-4 text-blue-500" />
      case '3d': return <Box className="w-4 h-4 text-purple-500" />
      default: return <Type className="w-4 h-4 text-slate-500" />
    }
  }

  const getTypeBadge = (type) => {
    switch(type) {
      case 'video': return 'bg-red-100 text-red-700'
      case 'file': return 'bg-blue-100 text-blue-700'
      case '3d': return 'bg-purple-100 text-purple-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const chapters = [...new Set(materi.map(m => m.chapter))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-amber-900">Kelola Materi</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <Card className="border-amber-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-amber-600">{materi.length}</div>
              <div className="text-xs text-slate-500">Halaman</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-purple-600">{materi.filter(m => m.type === '3d').length}</div>
              <div className="text-xs text-slate-500">3D Model</div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">{materi.filter(m => m.type === 'video').length}</div>
              <div className="text-xs text-slate-500">Video</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{materi.filter(m => m.type === 'file').length}</div>
              <div className="text-xs text-slate-500">File</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6 bg-amber-500 hover:bg-amber-600 h-12">
              <Plus className="w-5 h-5 mr-2" /> Tambah Halaman Materi
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Halaman Materi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Judul Halaman</Label>
                  <Input 
                    placeholder="Masukkan judul..." 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bab/Chapter</Label>
                  <Input 
                    placeholder="Contoh: Kubus, Balok..." 
                    value={formData.chapter}
                    onChange={(e) => setFormData({...formData, chapter: e.target.value})}
                  />
                </div>
              </div>

              {/* Content Type Tabs */}
              <div className="space-y-2">
                <Label>Tipe Konten</Label>
                <Tabs value={formData.contentType} onValueChange={(v) => setFormData({...formData, contentType: v})}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="text" className="flex items-center gap-1">
                      <Type className="w-4 h-4" /> Teks
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-1">
                      <Youtube className="w-4 h-4" /> Video
                    </TabsTrigger>
                    <TabsTrigger value="file" className="flex items-center gap-1">
                      <FileText className="w-4 h-4" /> File
                    </TabsTrigger>
                    <TabsTrigger value="3d" className="flex items-center gap-1">
                      <Box className="w-4 h-4" /> 3D/AR
                    </TabsTrigger>
                  </TabsList>

                  {/* Text Content */}
                  <TabsContent value="text" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Konten (HTML + LaTeX)</Label>
                      <Textarea 
                        placeholder="Gunakan $rumus$ untuk inline math, $$rumus$$ untuk display math&#10;&#10;Contoh: Rumus volume kubus adalah $V = s^3$" 
                        rows={6}
                        value={formData.content}
                        onChange={(e) => {
                          setFormData({...formData, content: e.target.value})
                          setPreviewLatex(e.target.value)
                        }}
                        className="font-mono text-sm"
                      />
                    </div>
                    {previewLatex && (
                      <div className="space-y-2">
                        <Label>Preview LaTeX:</Label>
                        <div className="p-4 bg-slate-50 rounded-lg border">
                          <RenderLatex content={previewLatex} />
                        </div>
                      </div>
                    )}
                    <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sm text-sky-700">
                      <p><strong>💡 Tips LaTeX:</strong></p>
                      <ul className="list-disc ml-4 mt-1 space-y-1">
                        <li>Inline: <code className="bg-sky-100 px-1">$V = s^3$</code></li>
                        <li>Display: <code className="bg-sky-100 px-1">$$V = \frac{'{'}4{'}'}{'{'}3{'}'}\pi r^3$$</code></li>
                        <li>Pecahan: <code className="bg-sky-100 px-1">\frac{'{'}a{'}'}{'{'}b{'}'}</code></li>
                        <li>Pangkat: <code className="bg-sky-100 px-1">x^2</code>, Indeks: <code className="bg-sky-100 px-1">x_1</code></li>
                      </ul>
                    </div>
                  </TabsContent>

                  {/* Video Content */}
                  <TabsContent value="video" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>URL Video YouTube</Label>
                      <Input 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                      />
                    </div>
                    {formData.videoUrl && (
                      <div className="space-y-2">
                        <Label>Preview:</Label>
                        <YouTubeEmbed url={formData.videoUrl} title="Preview Video" />
                      </div>
                    )}
                  </TabsContent>

                  {/* File Content */}
                  <TabsContent value="file" className="space-y-4 mt-4">
                    <FileUploader onUpload={handleFileUpload} />
                    {formData.fileUrl && formData.fileName && (
                      <div className="space-y-2">
                        <Label>File Terupload:</Label>
                        <FileAttachment 
                          url={formData.fileUrl} 
                          filename={formData.fileName}
                        />
                      </div>
                    )}
                  </TabsContent>

                  {/* 3D Content */}
                  <TabsContent value="3d" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Pilih Model 3D</Label>
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={formData.modelId}
                        onChange={(e) => setFormData({...formData, modelId: e.target.value})}
                      >
                        <option value="">Pilih model 3D...</option>
                        {available3DModels.map(model => (
                          <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-700">
                      <p>💡 Model 3D akan ditampilkan dengan 3D Viewer interaktif dan tombol AR untuk melihat di dunia nyata.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Button onClick={handleAdd} className="w-full bg-amber-500 hover:bg-amber-600" disabled={!formData.title || !formData.chapter}>
                <Save className="w-4 h-4 mr-2" /> Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Materi List by Chapter */}
        {chapters.map(chapter => (
          <div key={chapter} className="mb-6">
            <h2 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> {chapter}
            </h2>
            <div className="space-y-2">
              {materi.filter(m => m.chapter === chapter).map((item, index) => (
                <Card key={item.id} className="border-amber-100">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 font-bold text-sm">
                      {materi.findIndex(m => m.id === item.id) + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getTypeBadge(item.type)}`}>
                          {getTypeIcon(item.type)}
                          {item.type === 'text' ? 'Teks' : item.type === 'video' ? 'Video' : item.type === 'file' ? 'File' : '3D/AR'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-pink-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Preview Link */}
        <Card className="border-sky-200 bg-sky-50 mt-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sky-900">Preview Materi</h3>
              <p className="text-sm text-sky-700">Lihat tampilan materi untuk siswa</p>
            </div>
            <Button asChild variant="outline" className="border-sky-300 text-sky-700">
              <Link href="/materi"><Eye className="w-4 h-4 mr-2" /> Preview</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
