'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Plus, Copy, Trash2, UserCheck, Clock, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'

// Sample class data
const initialKelas = [
  { 
    id: 1, 
    name: 'Kelas 8A', 
    code: 'MTK8A', 
    students: 32,
    avgScore: 78,
    completedMaterial: 7,
    totalMaterial: 10
  },
  { 
    id: 2, 
    name: 'Kelas 8B', 
    code: 'MTK8B', 
    students: 30,
    avgScore: 82,
    completedMaterial: 8,
    totalMaterial: 10
  },
]

const sampleStudents = [
  { id: 1, name: 'Ahmad Fauzi', progress: 100, score: 85, lastActive: '2 jam lalu' },
  { id: 2, name: 'Budi Santoso', progress: 80, score: 78, lastActive: '5 jam lalu' },
  { id: 3, name: 'Citra Dewi', progress: 100, score: 92, lastActive: '1 jam lalu' },
  { id: 4, name: 'Diana Putri', progress: 60, score: 70, lastActive: '1 hari lalu' },
  { id: 5, name: 'Eko Prasetyo', progress: 90, score: 88, lastActive: '3 jam lalu' },
]

export default function GuruKelasPage() {
  const [kelas, setKelas] = useState(initialKelas)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedKelas, setSelectedKelas] = useState(null)
  const [newClassName, setNewClassName] = useState('')

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleAddKelas = () => {
    const newKelas = {
      id: Date.now(),
      name: newClassName,
      code: generateCode(),
      students: 0,
      avgScore: 0,
      completedMaterial: 0,
      totalMaterial: 10
    }
    setKelas([...kelas, newKelas])
    setNewClassName('')
    setIsAddOpen(false)
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    alert('Kode kelas berhasil disalin!')
  }

  const handleDeleteKelas = (id) => {
    if (confirm('Yakin ingin menghapus kelas ini?')) {
      setKelas(kelas.filter(k => k.id !== id))
    }
  }

  if (selectedKelas) {
    const kelasData = kelas.find(k => k.id === selectedKelas)
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <button 
              onClick={() => setSelectedKelas(null)} 
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali</span>
            </button>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span className="font-bold text-amber-900">{kelasData?.name}</span>
            </div>
            <div className="w-20"></div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {/* Class Info */}
          <Card className="border-amber-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-bold text-lg text-amber-900">{kelasData?.name}</h2>
                  <p className="text-sm text-slate-500">{kelasData?.students} siswa terdaftar</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Kode Kelas</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-lg text-amber-600">{kelasData?.code}</span>
                    <button onClick={() => copyCode(kelasData?.code)} className="text-slate-400 hover:text-slate-600">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-amber-700">Rata-rata Nilai</p>
                  <p className="text-2xl font-bold text-amber-600">{kelasData?.avgScore}</p>
                </div>
                <div className="bg-sky-50 rounded-lg p-3">
                  <p className="text-xs text-sky-700">Progress Materi</p>
                  <p className="text-2xl font-bold text-sky-600">{kelasData?.completedMaterial}/{kelasData?.totalMaterial}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <h2 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5" /> Daftar Siswa
          </h2>
          <div className="space-y-3">
            {sampleStudents.map((student) => (
              <Card key={student.id} className="border-amber-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800">{student.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {student.lastActive}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-amber-600">{student.score}</p>
                      <p className="text-xs text-slate-500">Nilai Quiz</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Progress Materi</span>
                      <span className="text-slate-700 font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

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
            <Users className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-amber-900">Kelola Kelas</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{kelas.length}</div>
              <div className="text-xs text-slate-500">Total Kelas</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">
                {kelas.reduce((acc, k) => acc + k.students, 0)}
              </div>
              <div className="text-xs text-slate-500">Total Siswa</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6 bg-amber-500 hover:bg-amber-600 h-12">
              <Plus className="w-5 h-5 mr-2" /> Buat Kelas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Kelas Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nama Kelas</Label>
                <Input 
                  placeholder="Contoh: Kelas 8A, Matematika 9B..." 
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                />
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                <p className="text-sm text-sky-700">
                  💡 Kode kelas akan di-generate otomatis. Bagikan kode ke siswa untuk bergabung.
                </p>
              </div>
              <Button onClick={handleAddKelas} className="w-full bg-amber-500 hover:bg-amber-600" disabled={!newClassName.trim()}>
                Buat Kelas
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Class List */}
        <h2 className="font-bold text-amber-900 mb-3">Daftar Kelas</h2>
        <div className="space-y-3">
          {kelas.map((item) => (
            <Card 
              key={item.id} 
              className="border-amber-100 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedKelas(item.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-amber-900">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-mono">
                        {item.code}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); copyCode(item.code); }} 
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteKelas(item.id); }}
                    className="text-pink-500 hover:text-pink-600 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-slate-700">{item.students}</p>
                    <p className="text-xs text-slate-500">Siswa</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-green-600">{item.avgScore}</p>
                    <p className="text-xs text-slate-500">Rata-rata</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-sky-600">{Math.round((item.completedMaterial/item.totalMaterial)*100)}%</p>
                    <p className="text-xs text-slate-500">Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {kelas.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Belum ada kelas. Buat kelas baru untuk memulai.</p>
          </div>
        )}
      </main>
    </div>
  )
}
