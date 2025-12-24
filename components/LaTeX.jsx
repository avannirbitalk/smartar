'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'

// LaTeX renderer component
export function LaTeX({ children, displayMode = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && children) {
      try {
        katex.render(children, containerRef.current, {
          throwOnError: false,
          displayMode: displayMode,
          strict: false
        })
      } catch (error) {
        console.error('KaTeX error:', error)
        if (containerRef.current) {
          containerRef.current.textContent = children
        }
      }
    }
  }, [children, displayMode])

  return <span ref={containerRef} className={displayMode ? 'block my-4' : 'inline'} />
}

// Parse text and render LaTeX expressions
export function RenderLatex({ content }) {
  if (!content) return null

  // Split by display math ($$...$$) and inline math ($...$)
  const parts = []
  let remaining = content
  let key = 0

  // Process display math first ($$...$$)
  while (remaining.includes('$$')) {
    const start = remaining.indexOf('$$')
    const end = remaining.indexOf('$$', start + 2)
    
    if (end === -1) break
    
    // Add text before
    if (start > 0) {
      parts.push({ type: 'text', content: remaining.substring(0, start), key: key++ })
    }
    
    // Add display math
    const latex = remaining.substring(start + 2, end)
    parts.push({ type: 'display', content: latex, key: key++ })
    
    remaining = remaining.substring(end + 2)
  }

  // Process inline math ($...$)
  if (remaining) {
    const inlineParts = remaining.split(/\$([^$]+)\$/g)
    inlineParts.forEach((part, index) => {
      if (index % 2 === 0) {
        // Regular text
        if (part) parts.push({ type: 'text', content: part, key: key++ })
      } else {
        // Inline math
        parts.push({ type: 'inline', content: part, key: key++ })
      }
    })
  }

  return (
    <>
      {parts.map(part => {
        if (part.type === 'display') {
          return <LaTeX key={part.key} displayMode={true}>{part.content}</LaTeX>
        } else if (part.type === 'inline') {
          return <LaTeX key={part.key}>{part.content}</LaTeX>
        } else {
          return <span key={part.key} dangerouslySetInnerHTML={{ __html: part.content }} />
        }
      })}
    </>
  )
}

export default LaTeX
