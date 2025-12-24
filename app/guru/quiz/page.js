'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, GraduationCap, Eye, Save, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// Sample quiz data
const initialQuiz = [
  { id: 1, question: 'Sebuah kubus memiliki panjang rusuk 5 cm. Berapakah volume kubus tersebut?', type: 'input', answer: '125', unit: 'cm³' },
  { id: 2, question: 'Berapakah jumlah sisi pada sebuah kubus?', type: 'choice', options: ['4 sisi', '6 sisi', '8 sisi', '12 sisi'], answer: '6 sisi' },
  { id: 3, question: 'Sebuah balok memiliki ukuran panjang 8 cm, lebar 5 cm, dan tinggi 4 cm. Berapakah volumenya?', type: 'input', answer: '160', unit: 'cm³' },
  { id: 4, question: 'Berapakah jumlah rusuk pada sebuah balok?', type: 'choice', options: ['6 rusuk', '8 rusuk', '10 rusuk', '12 rusuk'], answer: '12 rusuk' },
  { id: 5, question: 'Hitunglah luas permukaan balok dengan panjang 8 cm, lebar 5 cm, dan tinggi 4 cm!', type: 'input', answer: '184', unit: 'cm²' },
  { id: 6, question: 'Jika volume sebuah kubus adalah 216 cm³, berapakah panjang rusuknya?', type: 'input', answer: '6', unit: 'cm' },
  { id: 7, question: 'Rumus luas permukaan kubus adalah...', type: 'choice', options: ['L = s²', 'L = 4s²', 'L = 6s²', 'L = 8s²'], answer: 'L = 6s²' },
  { id: 8, question: 'Sebuah akuarium berbentuk balok memiliki volume 240 liter dengan panjang 80 cm dan lebar 50 cm. Berapakah tingginya?', type: 'input', answer: '60', unit: 'cm' },
]

export default function GuruQuizPage() {
  const [quiz, setQuiz] = useState(initialQuiz)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({ 
    question: '', 
    type: 'input', 
    answer: '', 
    unit: '',
    options: ['', '', '', ''],
    hint: '',
    explanation: ''
  })

  const handleAdd = () => {
    const newQuestion = {
      id: Date.now(),
      question: formData.question,
      type: formData.type,
      answer: formData.answer,
      unit: formData.type === 'input' ? formData.unit : undefined,
      options: formData.type === 'choice' ? formData.options.filter(o => o) : undefined,
      hint: formData.hint || undefined,
      explanation: formData.explanation || undefined
    }
    setQuiz([...quiz, newQuestion])
    setFormData({ question: '', type: 'input', answer: '', unit: '', options: ['', '', '', ''], hint: '', explanation: '' })
    setIsAddOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus soal ini?')) {
      setQuiz(quiz.filter(q => q.id !== id))
    }
  }

  const updateOption = (index, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({...formData, options: newOptions})
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
            <GraduationCap className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-amber-900">Kelola Quiz</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{quiz.length}</div>
              <div className="text-xs text-slate-500">Total Soal</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{quiz.filter(q => q.type === 'input').length}</div>
              <div className="text-xs text-slate-500">Soal Isian</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{quiz.filter(q => q.type === 'choice').length}</div>
              <div className="text-xs text-slate-500">Pilihan Ganda</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6 bg-amber-500 hover:bg-amber-600 h-12">
              <Plus className="w-5 h-5 mr-2" /> Tambah Soal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Soal Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipe Soal</Label>
                <RadioGroup 
                  value={formData.type} 
                  onValueChange={(v) => setFormData({...formData, type: v})}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="input" id="input" />
                    <Label htmlFor="input">Isian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="choice" id="choice" />
                    <Label htmlFor="choice">Pilihan Ganda</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Pertanyaan</Label>
                <Textarea 
                  placeholder="Masukkan pertanyaan..." 
                  rows={3}
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                />
              </div>

              {formData.type === 'choice' && (
                <div className="space-y-2">
                  <Label>Pilihan Jawaban</Label>
                  {formData.options.map((opt, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="w-8 h-10 flex items-center justify-center bg-slate-100 rounded text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <Input 
                        placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
                        value={opt}
                        onChange={(e) => updateOption(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label>Jawaban Benar</Label>
                {formData.type === 'choice' ? (
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  >
                    <option value="">Pilih jawaban benar...</option>
                    {formData.options.filter(o => o).map((opt, index) => (
                      <option key={index} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Jawaban" 
                      value={formData.answer}
                      onChange={(e) => setFormData({...formData, answer: e.target.value})}
                    />
                    <Input 
                      placeholder="Satuan" 
                      className="w-24"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Petunjuk (Opsional)</Label>
                <Input 
                  placeholder="Petunjuk untuk menjawab..." 
                  value={formData.hint}
                  onChange={(e) => setFormData({...formData, hint: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Penjelasan Jawaban (Opsional)</Label>
                <Textarea 
                  placeholder="Penjelasan mengapa jawabannya..." 
                  rows={2}
                  value={formData.explanation}
                  onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                />
              </div>

              <Button onClick={handleAdd} className="w-full bg-amber-500 hover:bg-amber-600">
                <Save className="w-4 h-4 mr-2" /> Simpan Soal
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Quiz List */}
        <h2 className="font-bold text-amber-900 mb-3">Daftar Soal</h2>
        <div className="space-y-3">
          {quiz.map((item, index) => (
            <Card key={item.id} className="border-amber-100">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 mb-2 line-clamp-2">{item.question}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.type === 'input' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {item.type === 'input' ? 'Isian' : 'Pilihan Ganda'}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {item.answer} {item.unit || ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preview Link */}
        <Card className="border-sky-200 bg-sky-50 mt-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sky-900">Preview Quiz</h3>
              <p className="text-sm text-sky-700">Coba quiz seperti siswa</p>
            </div>
            <Button asChild variant="outline" className="border-sky-300 text-sky-700">
              <Link href="/quiz"><Eye className="w-4 h-4 mr-2" /> Preview</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
