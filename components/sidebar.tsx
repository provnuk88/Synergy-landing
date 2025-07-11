"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  Sword,
  Newspaper,
  Trophy,
  Users,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  X,
  BirdIcon as Dragon,
} from "lucide-react"

const sidebarItems = [
  { id: "main", label: "Main", icon: Home, href: "/" },
  { id: "games", label: "Games", icon: Sword, href: "/games" },
  { id: "news", label: "News", icon: Newspaper, href: "/news" },
  { id: "hall-of-fame", label: "Hall of Fame", icon: Trophy, href: "/hall-of-fame" },
  { id: "creators", label: "Creators", icon: Users, href: "/creators" },
  { id: "dragons", label: "Dragons", icon: Dragon, href: "/dragons" },
  { id: "academy", label: "Academy", icon: GraduationCap, href: "/academy" },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 w-[250px] h-screen bg-[#1a1a2e] z-40 flex flex-col"
      style={{ height: "100vh" }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-[#499FFF]/20">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/synergy-logo.png" alt="Synergy Guild Logo" width={40} height={40} />
          <div>
            <h1 className="text-lg font-bold text-[#DCEFFF]">Synergy Guild</h1>
            <p className="text-xs text-[#DCEFFF]/60">Web3 Gaming</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="flex flex-col space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#499FFF]/20 text-[#499FFF] border-l-4 border-[#499FFF]"
                      : item.id === "dashboard"
                        ? "bg-[#5865F2] hover:bg-[#4752C4] text-white border-l-4 border-transparent"
                        : "text-[#DCEFFF]/70 hover:bg-[#499FFF]/10 hover:text-[#DCEFFF] border-l-4 border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Social Buttons */}
      <div className="p-4 border-t border-[#499FFF]/20">
        <div className="flex items-center justify-center space-x-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#DCEFFF]/70 hover:text-[#5865F2] transition-colors duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="sr-only">Discord</span>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#DCEFFF]/70 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
            <span className="sr-only">X (Twitter)</span>
          </a>
        </div>
      </div>
    </aside>
  )
}
