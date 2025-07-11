"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#080F1A] font-['Montserrat',sans-serif] text-[#DCEFFF] flex">
          <Sidebar />
          <main className="ml-[250px] flex-1 overflow-y-auto">{children}</main>
        </div>
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          aside::-webkit-scrollbar {
            display: none;
          }
          aside {
            scrollbar-width: none;
          }
        `}</style>
      </body>
    </html>
  )
}
