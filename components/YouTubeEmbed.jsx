'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'

// Extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  if (!url) return null
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /^([a-zA-Z0-9_-]{11})$/  // Direct video ID
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

export default function YouTubeEmbed({ url, title = 'Video' }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = getYouTubeId(url)

  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
        <p>Video tidak tersedia</p>
      </div>
    )
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  if (!isPlaying) {
    return (
      <div 
        className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => setIsPlaying(true)}
      >
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          onError={(e) => {
            e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-medium text-sm truncate">{title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <button
        onClick={() => setIsPlaying(false)}
        className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
