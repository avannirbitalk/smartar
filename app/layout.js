import './globals.css'

export const metadata = {
  title: 'SmartAR Edu - E-Learning dengan Augmented Reality',
  description: 'Platform e-learning modern dengan fitur 3D viewer dan Augmented Reality untuk pembelajaran yang interaktif',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-sky-50 to-white antialiased">
        {children}
      </body>
    </html>
  )
}
