import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBottomGate from '@/app/components/AdBottomGate'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoMarket.mn - 몽골 최대 중고차 거래 플랫폼',
  description: '몽골에서 가장 신뢰할 수 있는 중고차 거래 플랫폼입니다. 안전하고 편리하게 차량을 사고팔 수 있습니다.',
  keywords: '중고차, 몽골, 자동차, 거래, AutoMarket',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <AdBottomGate>
            {/* 전역 하단 광고가 있다면 여기에 추가 */}
          </AdBottomGate>
        </div>
      </body>
    </html>
  )
}
