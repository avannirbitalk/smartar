'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText, Image, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function FileUploader({ 
  onUpload, 
  accept = '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif',
  maxSize = 10 * 1024 * 1024, // 10MB default
  bucket = 'uploads'
}) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const supabase = createClient()

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setError('')

    // Validate file size
    if (file.size > maxSize) {
      setError(`File terlalu besar. Maksimal ${maxSize / (1024 * 1024)}MB`)
      return
    }

    setUploading(true)

    try {
      // Generate unique filename
      const timestamp = Date.now()
      const ext = file.name.split('.').pop()
      const filename = `${timestamp}-${Math.random().toString(36).substr(2, 9)}.${ext}`
      const filePath = `materials/${filename}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      // Call onUpload callback
      if (onUpload) {
        onUpload({
          url: urlData.publicUrl,
          filename: file.name,
          size: file.size,
          type: file.type,
          path: filePath
        })
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Gagal mengupload file')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  return (
    <div className="space-y-3">
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragOver 
            ? 'border-sky-500 bg-sky-50' 
            : 'border-slate-300 hover:border-sky-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        {uploading ? (
          <div className="py-4">
            <Loader2 className="w-10 h-10 text-sky-500 mx-auto mb-3 animate-spin" />
            <p className="text-slate-600">Mengupload file...</p>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-2">Drag & drop file di sini</p>
            <p className="text-sm text-slate-400 mb-3">atau</p>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Pilih File
            </Button>
            <p className="text-xs text-slate-400 mt-3">
              PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG (maks. {maxSize / (1024 * 1024)}MB)
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="bg-pink-50 border border-pink-200 text-pink-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
