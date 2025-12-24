'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Box, ArrowLeft, CheckCircle, XCircle, Trophy, RefreshCw, HelpCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'

const quizQuestions = [
  {
    id: 1,
    question: 'Sebuah kubus memiliki panjang rusuk 5 cm. Berapakah volume kubus tersebut?',
    type: 'input',
    answer: '125',
    unit: 'cm³',
    hint: 'V = s³ = 5 × 5 × 5',
    explanation: 'Volume kubus = s³ = 5³ = 5 × 5 × 5 = 125 cm³'
  },
  {
    id: 2,
    question: 'Berapakah jumlah sisi pada sebuah kubus?',
    type: 'choice',
    options: ['4 sisi', '6 sisi', '8 sisi', '12 sisi'],
    answer: '6 sisi',
    explanation: 'Kubus memiliki 6 sisi berbentuk persegi yang kongruen.'
  },
  {
    id: 3,
    question: 'Sebuah balok memiliki ukuran panjang 8 cm, lebar 5 cm, dan tinggi 4 cm. Berapakah volumenya?',
    type: 'input',
    answer: '160',
    unit: 'cm³',
    hint: 'V = p × l × t',
    explanation: 'Volume balok = p × l × t = 8 × 5 × 4 = 160 cm³'
  },
  {
    id: 4,
    question: 'Berapakah jumlah rusuk pada sebuah balok?',
    type: 'choice',
    options: ['6 rusuk', '8 rusuk', '10 rusuk', '12 rusuk'],
    answer: '12 rusuk',
    explanation: 'Balok memiliki 12 rusuk: 4 rusuk panjang, 4 rusuk lebar, dan 4 rusuk tinggi.'
  },
  {
    id: 5,
    question: 'Hitunglah luas permukaan balok dengan panjang 8 cm, lebar 5 cm, dan tinggi 4 cm!',
    type: 'input',
    answer: '184',
    unit: 'cm²',
    hint: 'L = 2(pl + pt + lt)',
    explanation: 'L = 2(pl + pt + lt) = 2(8×5 + 8×4 + 5×4) = 2(40 + 32 + 20) = 2(92) = 184 cm²'
  },
  {
    id: 6,
    question: 'Jika volume sebuah kubus adalah 216 cm³, berapakah panjang rusuknya?',
    type: 'input',
    answer: '6',
    unit: 'cm',
    hint: 's = ³√V',
    explanation: 's = ³√216 = 6 cm (karena 6 × 6 × 6 = 216)'
  },
  {
    id: 7,
    question: 'Rumus luas permukaan kubus adalah...',
    type: 'choice',
    options: ['L = s²', 'L = 4s²', 'L = 6s²', 'L = 8s²'],
    answer: 'L = 6s²',
    explanation: 'Kubus memiliki 6 sisi persegi, masing-masing luasnya s². Jadi total luas = 6 × s² = 6s²'
  },
  {
    id: 8,
    question: 'Sebuah akuarium berbentuk balok memiliki volume 240 liter dengan panjang 80 cm dan lebar 50 cm. Berapakah tingginya?',
    type: 'input',
    answer: '60',
    unit: 'cm',
    hint: 't = V ÷ (p × l). Ingat: 1 liter = 1000 cm³',
    explanation: '240 liter = 240.000 cm³. t = 240.000 ÷ (80 × 50) = 240.000 ÷ 4000 = 60 cm'
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [showHint, setShowHint] = useState(false)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const checkAnswer = (answer) => {
    const isCorrect = answer.toString().trim().toLowerCase() === question.answer.toLowerCase()
    setUserAnswers({ ...userAnswers, [question.id]: { answer, correct: isCorrect } })
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? 'Jawaban benar! 🎉' : 'Jawaban kurang tepat',
      explanation: question.explanation
    })
    setShowHint(false)
  }

  const handleSubmit = () => {
    if (question.type === 'input') {
      checkAnswer(inputValue)
    }
  }

  const handleChoiceSelect = (option) => {
    checkAnswer(option)
  }

  const goNext = () => {
    setFeedback(null)
    setInputValue('')
    setShowHint(false)
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers({})
    setShowResult(false)
    setInputValue('')
    setFeedback(null)
    setShowHint(false)
  }

  const correctCount = Object.values(userAnswers).filter(a => a.correct).length
  const score = Math.round((correctCount / quizQuestions.length) * 100)

  // Result Screen
  if (showResult) {
    const getMessage = () => {
      if (score >= 90) return { emoji: '🏆', text: 'Luar Biasa!', desc: 'Kamu sangat menguasai materi ini!' }
      if (score >= 70) return { emoji: '🎉', text: 'Bagus!', desc: 'Pemahaman kamu sudah baik!' }
      if (score >= 50) return { emoji: '💪', text: 'Cukup Baik', desc: 'Terus belajar untuk hasil lebih baik!' }
      return { emoji: '📚', text: 'Perlu Belajar Lagi', desc: 'Ayo pelajari kembali materinya!' }
    }
    const msg = getMessage()

    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali</span>
            </Link>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-sky-900">Hasil Quiz</span>
            </div>
            <div className="w-20"></div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            {/* Score Circle */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#e0f2fe" strokeWidth="12" />
                <circle 
                  cx="80" cy="80" r="70" fill="none" 
                  stroke={score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#f472b6'}
                  strokeWidth="12" 
                  strokeDasharray={`${score * 4.4} 440`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-sky-900">{score}</span>
                <span className="text-sm text-slate-500">Skor</span>
              </div>
            </div>

            <div className="text-5xl mb-2">{msg.emoji}</div>
            <h1 className="text-2xl font-bold text-sky-900 mb-1">{msg.text}</h1>
            <p className="text-slate-600 mb-6">{msg.desc}</p>

            <Card className="border-sky-100 mb-6 text-left">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-600">Total Soal</span>
                  <span className="font-bold text-sky-900">{quizQuestions.length}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Benar
                  </span>
                  <span className="font-bold text-green-600">{correctCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-pink-500" /> Salah
                  </span>
                  <span className="font-bold text-pink-600">{quizQuestions.length - correctCount}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={restartQuiz} className="w-full bg-sky-500 hover:bg-sky-600 h-12">
                <RefreshCw className="w-5 h-5 mr-2" />
                Ulangi Quiz
              </Button>
              <Button asChild variant="outline" className="w-full border-sky-200 h-12">
                <Link href="/materi">📖 Pelajari Lagi Materi</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full h-12">
                <Link href="/">🏠 Kembali ke Beranda</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Question Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Keluar</span>
            </Link>
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-sky-600" />
              <span className="font-bold text-sky-900">Quiz</span>
            </div>
            <span className="text-sm text-slate-600 bg-sky-100 px-2 py-1 rounded-full">
              {currentQuestion + 1}/{quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      {/* Question */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-lg mx-auto">
          <Card className="border-sky-100 shadow-lg mb-6">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Soal {currentQuestion + 1}
                </span>
                {question.hint && !feedback && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Petunjuk
                  </button>
                )}
              </div>
              <p className="text-lg text-sky-900 leading-relaxed">
                {question.question}
              </p>
              {showHint && question.hint && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                  💡 {question.hint}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Answer Input */}
          {question.type === 'input' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan jawaban..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-lg h-14 border-sky-200 focus:border-sky-500 rounded-xl"
                  disabled={feedback !== null}
                />
                {question.unit && (
                  <div className="flex items-center px-4 bg-sky-50 rounded-xl text-sky-700 font-medium border border-sky-200">
                    {question.unit}
                  </div>
                )}
              </div>
              {!feedback && (
                <Button 
                  onClick={handleSubmit} 
                  className="w-full bg-sky-500 hover:bg-sky-600 h-14 text-base rounded-xl"
                  disabled={!inputValue.trim()}
                >
                  Cek Jawaban
                </Button>
              )}
            </div>
          )}

          {/* Multiple Choice */}
          {question.type === 'choice' && (
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = userAnswers[question.id]?.answer === option
                const isCorrectOption = option === question.answer
                const showCorrect = feedback && isCorrectOption
                const showWrong = feedback && isSelected && !userAnswers[question.id]?.correct

                return (
                  <button
                    key={index}
                    onClick={() => !feedback && handleChoiceSelect(option)}
                    disabled={feedback !== null}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showWrong
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-sky-200 bg-white hover:border-sky-400 hover:bg-sky-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showCorrect ? 'bg-green-500 text-white' :
                      showWrong ? 'bg-pink-500 text-white' :
                      'bg-sky-100 text-sky-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium flex-1">{option}</span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {showWrong && <XCircle className="w-5 h-5 text-pink-500" />}
                  </button>
                )
              })}
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`mt-5 p-4 rounded-xl ${
              feedback.correct ? 'bg-green-50 border border-green-200' : 'bg-pink-50 border border-pink-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {feedback.correct ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-pink-600" />
                )}
                <span className={`font-bold ${feedback.correct ? 'text-green-700' : 'text-pink-700'}`}>
                  {feedback.message}
                </span>
              </div>
              <p className={`text-sm ${feedback.correct ? 'text-green-600' : 'text-pink-600'}`}>
                {feedback.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {feedback && (
            <Button 
              onClick={goNext} 
              className="w-full mt-5 bg-sky-500 hover:bg-sky-600 h-14 text-base rounded-xl"
            >
              {currentQuestion < quizQuestions.length - 1 ? (
                <>Soal Berikutnya <ChevronRight className="w-5 h-5 ml-1" /></>
              ) : (
                '🏆 Lihat Hasil'
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
