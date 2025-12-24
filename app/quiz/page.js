'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Box, ArrowLeft, CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react'
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
    hint: 'Gunakan rumus V = r³'
  },
  {
    id: 2,
    question: 'Sebuah balok memiliki ukuran panjang 8 cm, lebar 5 cm, dan tinggi 4 cm. Berapakah luas permukaannya?',
    type: 'input',
    answer: '184',
    unit: 'cm²',
    hint: 'Gunakan rumus L = 2(pl + pt + lt)'
  },
  {
    id: 3,
    question: 'Jika volume sebuah kubus adalah 216 cm³, berapakah panjang rusuknya?',
    type: 'input',
    answer: '6',
    unit: 'cm',
    hint: 'r = ³√V'
  },
  {
    id: 4,
    question: 'Berapakah jumlah sisi pada sebuah balok?',
    type: 'choice',
    options: ['4', '5', '6', '8'],
    answer: '6'
  },
  {
    id: 5,
    question: 'Sebuah balok memiliki volume 240 cm³ dengan panjang 8 cm dan lebar 5 cm. Berapakah tingginya?',
    type: 'input',
    answer: '6',
    unit: 'cm',
    hint: 'V = p × l × t'
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [feedback, setFeedback] = useState(null) // { correct: boolean, message: string }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const checkAnswer = (answer) => {
    const isCorrect = answer.trim().toLowerCase() === question.answer.toLowerCase()
    setUserAnswers({ ...userAnswers, [question.id]: { answer, correct: isCorrect } })
    setFeedback({
      correct: isCorrect,
      message: isCorrect 
        ? 'Jawaban benar!' 
        : `Jawaban salah. Jawaban yang benar: ${question.answer} ${question.unit || ''}`
    })
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
  }

  const correctCount = Object.values(userAnswers).filter(a => a.correct).length
  const score = Math.round((correctCount / quizQuestions.length) * 100)

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
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

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-amber-100' : 'bg-pink-100'
            }`}>
              <Trophy className={`w-12 h-12 ${
                score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-pink-600'
              }`} />
            </div>
            
            <h1 className="text-3xl font-bold text-sky-900 mb-2">Quiz Selesai!</h1>
            <p className="text-slate-600 mb-6">Berikut adalah hasil quiz kamu</p>

            <Card className="border-sky-100 mb-6">
              <CardContent className="p-6">
                <div className="text-5xl font-bold text-sky-600 mb-2">{score}</div>
                <p className="text-slate-600">Skor</p>
                <div className="mt-4 text-sm text-slate-600">
                  {correctCount} dari {quizQuestions.length} soal benar
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={restartQuiz} className="w-full bg-sky-500 hover:bg-sky-600">
                <RefreshCw className="w-5 h-5 mr-2" />
                Ulangi Quiz
              </Button>
              <Button asChild variant="outline" className="w-full border-sky-200">
                <Link href="/materi">Pelajari Lagi Materi</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/dashboard" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Keluar</span>
            </Link>
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-sky-600" />
              <span className="font-bold text-sky-900">Quiz</span>
            </div>
            <span className="text-sm text-slate-600">
              {currentQuestion + 1} / {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </header>

      {/* Question */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <Card className="border-sky-100 shadow-lg mb-6">
            <CardContent className="p-6">
              <span className="bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1 rounded-full">
                Soal {currentQuestion + 1}
              </span>
              <p className="text-lg text-sky-900 mt-4 leading-relaxed">
                {question.question}
              </p>
              {question.hint && (
                <p className="text-sm text-slate-500 mt-3 italic">
                  Petunjuk: {question.hint}
                </p>
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
                  className="text-lg border-sky-200 focus:border-sky-500"
                  disabled={feedback !== null}
                />
                {question.unit && (
                  <div className="flex items-center px-4 bg-sky-50 rounded-lg text-sky-700 font-medium">
                    {question.unit}
                  </div>
                )}
              </div>
              {!feedback && (
                <Button 
                  onClick={handleSubmit} 
                  className="w-full bg-sky-500 hover:bg-sky-600 h-12"
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
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !feedback && handleChoiceSelect(option)}
                  disabled={feedback !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    feedback && option === question.answer
                      ? 'border-green-500 bg-green-50'
                      : feedback && userAnswers[question.id]?.answer === option && !userAnswers[question.id]?.correct
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-sky-200 bg-white hover:border-sky-400'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
              feedback.correct ? 'bg-green-50 border border-green-200' : 'bg-pink-50 border border-pink-200'
            }`}>
              {feedback.correct ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-pink-600 flex-shrink-0" />
              )}
              <span className={feedback.correct ? 'text-green-700' : 'text-pink-700'}>
                {feedback.message}
              </span>
            </div>
          )}

          {/* Next Button */}
          {feedback && (
            <Button 
              onClick={goNext} 
              className="w-full mt-4 bg-sky-500 hover:bg-sky-600 h-12"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
