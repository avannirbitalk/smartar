'use client'

import { FileText, Download, Eye, File, FileImage } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Get file icon based on extension
function getFileIcon(filename) {
  const ext = filename?.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return <FileText className="w-6 h-6 text-red-500" />
    case 'doc':
    case 'docx':
      return <FileText className="w-6 h-6 text-blue-500" />
    case 'xls':
    case 'xlsx':
      return <FileText className="w-6 h-6 text-green-500" />
    case 'ppt':
    case 'pptx':
      return <FileText className="w-6 h-6 text-orange-500" />
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage className="w-6 h-6 text-purple-500" />
    default:
      return <File className="w-6 h-6 text-slate-500" />
  }
}

// Format file size
function formatFileSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function FileAttachment({ url, filename, size, onPreview }) {
  const ext = filename?.split('.').pop()?.toLowerCase()
  const canPreview = ['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(ext)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePreview = () => {
    if (ext === 'pdf') {
      // Open PDF in new tab
      window.open(url, '_blank')
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      // Open image in new tab or use custom preview
      if (onPreview) {
        onPreview(url, filename)
      } else {
        window.open(url, '_blank')
      }
    }
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
        {getFileIcon(filename)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-800 truncate">{filename}</p>
        <p className="text-sm text-slate-500">
          {ext?.toUpperCase()} {size && `• ${formatFileSize(size)}`}
        </p>
      </div>
      <div className="flex gap-2">
        {canPreview && (
          <Button size="sm" variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4" />
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={handleDownload}>
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
