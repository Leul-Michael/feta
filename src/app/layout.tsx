import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trello Board Clone",
  description: "A simple board app built based on trello.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="main w-full min-h-screen h-full flex flex-col antialiased overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
