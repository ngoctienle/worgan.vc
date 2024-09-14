import { Phudu } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const phuduFont = Phudu({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Worgan Venture Capital',
  description: 'Where Finance meets Technology. Unlock your Futures: Essential ICT Concepts Revealed!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${phuduFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
