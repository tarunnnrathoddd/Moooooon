import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import type React from "react" // Import React

export const metadata: Metadata = {
  title: "Lunar Analysis Interface",
  description: "Interactive lunar surface analysis tool",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  )
}

