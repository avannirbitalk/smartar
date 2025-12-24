'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, BookOpen, Box, Eye, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const STORAGE_URL = 'https://hmgdlcwzpmbgvfpaiylz.supabase.co/storage/v1/object/public/images'

// Available 3D models
const available3DModels = [
  { id: 'kubus-64', name: 'Volume Kubus 4x4x4', url: `${STORAGE_URL}/animasi/kubus-64.glb`, arUrl: 'https://mywebar.com/p/objek1volumekubus' },
  { id: 'balok-1', name: 'Jaring-jaring Balok 1', url: `${STORAGE_URL}/animasi/animasi-jaring-balok-1.glb`, arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok' },
  { id: 'balok-2', name: 'Jaring-jaring Balok 2', url: `${STORAGE_URL}/animasi/animasi-jaring-balok-2.glb`, arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok' },
]

// Sample materi data (would normally come from database)
const initialMateri = [
  { id: 1, title: 'Pendahuluan Bangun Ruang', chapter: 'Pendahuluan', hasModel: false },
  { id: 2, title: 'Pengertian Kubus', chapter: 'Kubus', hasModel: false },
  { id: 3, title: 'Volume Kubus', chapter: 'Kubus', hasModel: true, modelId: 'kubus-64' },
  { id: 4, title: 'Contoh Soal Volume Kubus', chapter: 'Kubus', hasModel: false },
  { id: 5, title: 'Pengertian Balok', chapter: 'Balok', hasModel: false },
  { id: 6, title: 'Volume Balok', chapter: 'Balok', hasModel: false },
  { id: 7, title: 'Luas Permukaan Balok', chapter: 'Balok', hasModel: true, modelId: 'balok-1' },
  { id: 8, title: 'Rumus Luas Permukaan Balok', chapter: 'Balok', hasModel: false },
  { id: 9, title: 'Variasi Jaring-jaring Balok', chapter: 'Balok', hasModel: true, modelId: 'balok-2' },
  { id: 10, title: 'Rangkuman Materi', chapter: 'Rangkuman', hasModel: false },
]

export default function GuruMateriPage() {
  const [materi, setMateri] = useState(initialMateri)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', chapter: '', content: '', modelId: '' })

  const handleAdd = () => {
    const newMateri = {
      id: Date.now(),
      title: formData.title,
      chapter: formData.chapter,
      hasModel: !!formData.modelId,
      modelId: formData.modelId || null
    }
    setMateri([...materi, newMateri])
    setFormData({ title: '', chapter: '', content: '', modelId: '' })
    setIsAddOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus materi ini?')) {
      setMateri(materi.filter(m => m.id !== id))
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
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{materi.length}</div>
              <div className="text-xs text-slate-500">Total Halaman</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{chapters.length}</div>
              <div className="text-xs text-slate-500">Bab</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{materi.filter(m => m.hasModel).length}</div>
              <div className="text-xs text-slate-500">Dengan 3D</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6 bg-amber-500 hover:bg-amber-600 h-12">
              <Plus className="w-5 h-5 mr-2" /> Tambah Halaman Materi
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Halaman Materi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
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
              <div className="space-y-2">
                <Label>Model 3D (Opsional)</Label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={formData.modelId}
                  onChange={(e) => setFormData({...formData, modelId: e.target.value})}
                >
                  <option value="">Tanpa Model 3D</option>
                  {available3DModels.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Konten (HTML)</Label>
                <Textarea 
                  placeholder="<h2>Judul</h2><p>Konten...</p>" 
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-amber-500 hover:bg-amber-600">
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
                      {item.hasModel && (
                        <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                          <Box className="w-3 h-3 inline mr-1" />3D Model
                        </span>
                      )}
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
