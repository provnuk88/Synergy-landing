"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Monitor, Smartphone, Globe, Play } from "lucide-react"

interface GameCardProps {
  game: {
    id: number
    slug: string
    title: string
    image: string
    badge?: string
    players: string
    rating: number
    genre: string[]
    platforms: string[]
    blockchain: string
    status: string
  }
  isCarousel?: boolean
}

export default function GameCard({ game, isCarousel = false }: GameCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Released": return "bg-green-500"
      case "Beta": return "bg-blue-500"
      case "In Development": return "bg-orange-500"
      default: return "bg-gray-500"
    }
  }

  const getBlockchainIcon = (blockchain: string) => {
    switch (blockchain) {
      case "ETH": return "Ξ"
      case "Polygon": return "⬟"
      case "BSC": return "◆"
      default: return "◇"
    }
  }

  return (
    <Link href={`/games/${game.slug}`}>
      <div className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#499FFF]/50 hover:scale-105 hover:shadow-2xl hover:shadow-[#499FFF]/20 ${isCarousel ? 'min-w-[300px] mr-6' : ''}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={game.image}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {game.badge && (
              <Badge className={`${game.badge === 'HOT' ? 'bg-red-500' : 'bg-green-500'} text-white font-bold`}>
                {game.badge === 'HOT' ? '🔥 HOT' : '✨ NEW'}
              </Badge>
            )}
            <Badge className={`${getStatusColor(game.status)} text-white`}>
              {game.status}
            </Badge>
          </div>

          {/* Blockchain */}
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold">
              {getBlockchainIcon(game.blockchain)}
            </div>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-[#499FFF]/80 backdrop-blur-md rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#499FFF] transition-colors">
            {game.title}
          </h3>
          
          {/* Genre tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {game.genre.map((g: string) => (
              <Badge key={g} variant="outline" className="border-orange-500 text-orange-400 bg-orange-500/10">
                {g}
              </Badge>
            ))}
          </div>

          {/* Platform icons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {game.platforms.includes('PC') && <Monitor className="w-4 h-4 text-[#DCEFFF]/70" />}
                {game.platforms.includes('Mobile') && <Smartphone className="w-4 h-4 text-[#DCEFFF]/70" />}
                {game.platforms.includes('Browser') && <Globe className="w-4 h-4 text-[#DCEFFF]/70" />}
              </div>
              <div className="flex items-center gap-1 text-[#DCEFFF]/70">
                <Users className="w-4 h-4" />
                <span className="text-sm">{game.players}</span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-[#DCEFFF]/70">{game.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}