"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Star,
  Users,
  Gamepad2,
  Monitor,
  Smartphone,
  Globe,
  TrendingUp,
  Sparkles,
  Play,
} from "lucide-react"

// Mock data for games
const trendingGames = [
  {
    id: 1,
    slug: "apeiron",
    title: "Apeiron",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "HOT",
    players: "125K",
    rating: 4.8,
    genre: ["Action", "RPG"],
    platforms: ["PC", "Mobile"],
    blockchain: "ETH",
    status: "Released"
  },
  {
    id: 2,
    slug: "guild-of-guardians",
    title: "Guild of Guardians",
    image: "https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "NEW",
    players: "89K",
    rating: 4.6,
    genre: ["RPG", "Strategy"],
    platforms: ["Mobile"],
    blockchain: "Polygon",
    status: "Released"
  },
  {
    id: 3,
    slug: "seraph",
    title: "Seraph",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "HOT",
    players: "67K",
    rating: 4.7,
    genre: ["RPG", "Fantasy"],
    platforms: ["PC", "Browser"],
    blockchain: "BSC",
    status: "Beta"
  },
  {
    id: 4,
    slug: "spellborne",
    title: "Spellborne",
    image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "NEW",
    players: "45K",
    rating: 4.5,
    genre: ["Strategy", "Card"],
    platforms: ["PC", "Mobile"],
    blockchain: "ETH",
    status: "Released"
  },
  {
    id: 5,
    slug: "tokyo-beast",
    title: "Tokyo Beast",
    image: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "HOT",
    players: "156K",
    rating: 4.9,
    genre: ["Action", "Battle"],
    platforms: ["PC", "Mobile", "Browser"],
    blockchain: "Polygon",
    status: "Released"
  }
]

const allGames = [
  ...trendingGames,
  {
    id: 6,
    slug: "lumiterra",
    title: "Lumiterra",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "",
    players: "34K",
    rating: 4.3,
    genre: ["Simulation", "Building"],
    platforms: ["PC"],
    blockchain: "ETH",
    status: "In Development"
  },
  {
    id: 7,
    slug: "bloodloop",
    title: "BloodLoop",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "",
    players: "28K",
    rating: 4.4,
    genre: ["Action", "Shooter"],
    platforms: ["PC"],
    blockchain: "BSC",
    status: "Beta"
  },
  {
    id: 8,
    slug: "eve-frontier",
    title: "EVE Frontier",
    image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "",
    players: "78K",
    rating: 4.6,
    genre: ["Space", "Strategy"],
    platforms: ["PC"],
    blockchain: "ETH",
    status: "Released"
  }
]

const GameCard = ({ game, isCarousel = false }: { game: any, isCarousel?: boolean }) => {
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

export default function GamesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [filteredGames, setFilteredGames] = useState(allGames)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedBlockchain, setSelectedBlockchain] = useState("all")
  const [activeFilter, setActiveFilter] = useState("trending")

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, trendingGames.length - 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Filter games
  useEffect(() => {
    let filtered = allGames

    // По умолчанию показываем trending игры
    if (activeFilter === "all") {
      filtered = allGames
    } else if (activeFilter === "trending") {
      filtered = trendingGames
    } else if (activeFilter === "new") {
      filtered = allGames.filter(game => game.badge === "NEW")
    }

    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter(game => game.genre.includes(selectedGenre))
    }

    if (selectedPlatform !== "all") {
      filtered = filtered.filter(game => game.platforms.includes(selectedPlatform))
    }

    if (selectedBlockchain !== "all") {
      filtered = filtered.filter(game => game.blockchain === selectedBlockchain)
    }

    setFilteredGames(filtered)
  }, [searchTerm, selectedGenre, selectedPlatform, selectedBlockchain, activeFilter])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, trendingGames.length - 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, trendingGames.length - 2)) % Math.max(1, trendingGames.length - 2))
  }

  return (
    <div className="bg-[#080F1A] text-[#DCEFFF] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Aurora Background */}
        <div className="aurora-bg absolute inset-0">
          <div className="aurora-dot"></div>
          <div className="aurora-dot"></div>
          <div className="aurora-dot"></div>
          <div className="aurora-dot"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#499FFF] rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#499FFF] via-white to-[#499FFF] bg-clip-text text-transparent animate-pulse">
              Games
            </h1>
            <p className="text-2xl md:text-3xl text-[#DCEFFF]/80 max-w-4xl mx-auto">
              Discover and master the best Web3 games with <span className="text-[#499FFF] font-semibold">Synergy Guild</span>
            </p>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12 px-4">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "bg-[#499FFF] text-white" : "border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white"}
              >
                All Games
              </Button>
              <Button
                variant={activeFilter === "trending" ? "default" : "outline"}
                onClick={() => setActiveFilter("trending")}
                className={activeFilter === "trending" ? "bg-[#499FFF] text-white" : "border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white"}
              >
                🔥 Trending
              </Button>
              <Button
                variant={activeFilter === "new" ? "default" : "outline"}
                onClick={() => setActiveFilter("new")}
                className={activeFilter === "new" ? "bg-[#499FFF] text-white" : "border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white"}
              >
                ✨ New
              </Button>
              
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40 border-[#499FFF] text-[#DCEFFF]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="Action">Action</SelectItem>
                  <SelectItem value="RPG">RPG</SelectItem>
                  <SelectItem value="Strategy">Strategy</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Simulation">Simulation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-40 border-[#499FFF] text-[#DCEFFF]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="PC">PC</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Browser">Browser</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                <SelectTrigger className="w-40 border-[#499FFF] text-[#DCEFFF]">
                  <SelectValue placeholder="Blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chains</SelectItem>
                  <SelectItem value="ETH">Ethereum</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="BSC">BSC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Games Carousel */}
      <section className="py-20 px-4 lg:px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#499FFF]" />
              🔥 Trending Now
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 320}px)` }}
            >
              {trendingGames.map((game) => (
                <GameCard key={game.id} game={game} isCarousel />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 lg:px-6 mb-8">
        <div className="container mx-auto">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#DCEFFF]/50 w-5 h-5" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-[#DCEFFF] placeholder:text-[#DCEFFF]/50"
            />
          </div>
        </div>
      </section>

      {/* All Games Grid */}
      <section className="py-12 px-4 lg:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-[#499FFF]" />
            All Games ({filteredGames.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <Gamepad2 className="w-16 h-16 text-[#DCEFFF]/30 mx-auto mb-4" />
              <p className="text-xl text-[#DCEFFF]/70">No games found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes aurora-move {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
          25% { transform: translate(20vw, -30vh) rotate(90deg); opacity: 0.8; }
          50% { transform: translate(-25vw, 20vh) rotate(180deg); opacity: 0.6; }
          75% { transform: translate(15vw, 35vh) rotate(270deg); opacity: 0.9; }
          100% { transform: translate(0, 0) rotate(360deg); opacity: 0.5; }
        }

        .aurora-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          filter: blur(100px) brightness(0.8);
        }

        .aurora-dot {
          position: absolute;
          width: 40vw;
          height: 40vw;
          border-radius: 50%;
          mix-blend-mode: screen;
          animation: aurora-move 20s infinite;
        }

        .aurora-dot:nth-child(1) {
          background-color: rgba(73, 159, 255, 0.3);
          top: 10%;
          left: 10%;
          animation-duration: 22s;
        }
        .aurora-dot:nth-child(2) {
          background-color: rgba(39, 75, 117, 0.4);
          top: 20%;
          left: 70%;
          animation-duration: 25s;
          animation-delay: -5s;
        }
        .aurora-dot:nth-child(3) {
          background-color: rgba(220, 239, 255, 0.2);
          top: 60%;
          left: 5%;
          animation-duration: 28s;
          animation-delay: -10s;
        }
        .aurora-dot:nth-child(4) {
          background-color: rgba(20, 30, 48, 0.5);
          top: 70%;
          left: 60%;
          animation-duration: 20s;
          animation-delay: -15s;
        }
      `}</style>
    </div>
  )
}