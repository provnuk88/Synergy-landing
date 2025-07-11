"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Medal,
  Users,
  Star,
  Crown,
  Target,
  Flame,
  Diamond,
  ChevronLeft,
  ChevronRight,
  Play,
  Share2,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  Eye,
  ExternalLink,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react"

// Sample data
const guildStats = {
  totalWins: 247,
  totalEarnings: 1250000,
  championCount: 89,
  achievementCount: 1456
}

const milestones = [
  {
    id: 1,
    date: "2024-12-15",
    title: "Tokyo Beast World Championship Victory",
    description: "Our team dominated the global championship, securing first place and $50,000 prize pool",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600",
    isNew: true,
    type: "tournament"
  },
  {
    id: 2,
    date: "2024-11-28",
    title: "Guild Reaches 10,000 Members",
    description: "Synergy Guild officially becomes one of the largest Web3 gaming communities",
    image: "https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=600",
    isNew: true,
    type: "milestone"
  },
  {
    id: 3,
    date: "2024-10-12",
    title: "First Million Dollar Prize Pool",
    description: "Collective earnings from tournaments surpass the $1M milestone",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=600",
    isNew: false,
    type: "achievement"
  },
  {
    id: 4,
    date: "2024-08-05",
    title: "Apeiron Season 7 Domination",
    description: "Guild members secure top 5 positions in the competitive season",
    image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=600",
    isNew: false,
    type: "tournament"
  }
]

const tournaments = [
  {
    id: 1,
    name: "Tokyo Beast Championship 2024",
    game: "Tokyo Beast",
    position: 1,
    prize: 50000,
    date: "2024-12-15",
    players: ["ShadowNinja", "CryptoKing", "BlockMaster"],
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    highlights: "tournament_highlights_1.mp4"
  },
  {
    id: 2,
    name: "Guild of Guardians Season 15",
    game: "Guild of Guardians",
    position: 2,
    prize: 25000,
    date: "2024-11-20",
    players: ["DragonSlayer", "MysticMage"],
    image: "https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=400",
    highlights: "tournament_highlights_2.mp4"
  },
  {
    id: 3,
    name: "Seraph Season 3 Finals",
    game: "Seraph",
    position: 1,
    prize: 75000,
    date: "2024-10-30",
    players: ["PhantomBlade", "SoulReaper", "VoidWalker"],
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400",
    highlights: "tournament_highlights_3.mp4"
  }
]

const topPlayers = [
  {
    id: 1,
    username: "ShadowNinja",
    avatar: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200",
    rank: 1,
    tournamentsWon: 15,
    winRate: 87,
    favoriteGame: "Tokyo Beast",
    totalEarnings: 125000,
    badges: ["legendary", "champion"]
  },
  {
    id: 2,
    username: "CryptoKing",
    avatar: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=200",
    rank: 2,
    tournamentsWon: 12,
    winRate: 82,
    favoriteGame: "Apeiron",
    totalEarnings: 98000,
    badges: ["epic", "strategist"]
  },
  {
    id: 3,
    username: "DragonSlayer",
    avatar: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=200",
    rank: 3,
    tournamentsWon: 10,
    winRate: 79,
    favoriteGame: "Guild of Guardians",
    totalEarnings: 76000,
    badges: ["rare", "guardian"]
  },
  {
    id: 4,
    username: "PhantomBlade",
    avatar: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=200",
    rank: 4,
    tournamentsWon: 8,
    winRate: 75,
    favoriteGame: "Seraph",
    totalEarnings: 65000,
    badges: ["epic", "assassin"]
  }
]

const achievements = [
  {
    id: 1,
    type: "tournament_win",
    title: "Perfect Victory",
    description: "Won tournament without losing a single match",
    player: "ShadowNinja",
    date: "2024-12-15",
    rarity: "legendary",
    icon: Trophy,
    size: "large"
  },
  {
    id: 2,
    type: "streak",
    title: "Unstoppable Force",
    description: "25 consecutive wins",
    player: "CryptoKing",
    date: "2024-11-28",
    rarity: "epic",
    icon: Flame,
    size: "medium"
  },
  {
    id: 3,
    type: "rare",
    title: "First Blood",
    description: "Guild's first tournament victory",
    player: "DragonSlayer",
    date: "2024-01-15",
    rarity: "legendary",
    icon: Crown,
    size: "large"
  },
  {
    id: 4,
    type: "perfect_play",
    title: "Flawless Execution",
    description: "Perfect game with 100% accuracy",
    player: "PhantomBlade",
    date: "2024-10-30",
    rarity: "rare",
    icon: Target,
    size: "small"
  }
]

const leaderboard = [
  { rank: 1, player: "ShadowNinja", points: 2450, change: 0 },
  { rank: 2, player: "CryptoKing", points: 2380, change: 1 },
  { rank: 3, player: "DragonSlayer", points: 2290, change: -1 },
  { rank: 4, player: "PhantomBlade", points: 2180, change: 2 },
  { rank: 5, player: "MysticMage", points: 2050, change: 0 }
]

const wallOfFame = [
  {
    id: 1,
    name: "ShadowNinja",
    title: "Guild Founder",
    achievement: "Founded Synergy Guild",
    avatar: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200",
    type: "founder"
  },
  {
    id: 2,
    name: "CryptoKing",
    title: "First Champion",
    achievement: "First tournament winner",
    avatar: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=200",
    type: "first_winner"
  },
  {
    id: 3,
    name: "DragonSlayer",
    title: "Record Breaker",
    achievement: "Highest single tournament earnings",
    avatar: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=200",
    type: "record"
  }
]

export default function HallOfFamePage() {
  const [currentTournament, setCurrentTournament] = useState(0)
  const [playerFilter, setPlayerFilter] = useState("all")
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [animatedStats, setAnimatedStats] = useState({
    totalWins: 0,
    totalEarnings: 0,
    championCount: 0,
    achievementCount: 0
  })

  const observerRef = useRef<IntersectionObserver | null>(null)

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = ["hero", "milestones", "tournaments", "players", "achievements", "leaderboard", "wall-of-fame"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Animate statistics counters
  useEffect(() => {
    if (visibleSections.has("hero")) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedStats({
          totalWins: Math.floor(guildStats.totalWins * progress),
          totalEarnings: Math.floor(guildStats.totalEarnings * progress),
          championCount: Math.floor(guildStats.championCount * progress),
          achievementCount: Math.floor(guildStats.achievementCount * progress)
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setAnimatedStats(guildStats)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }
  }, [visibleSections])

  // Auto-rotate tournaments
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTournament((prev) => (prev + 1) % tournaments.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-[#DCEFFF] border-[#DCEFFF]"
      case "rare": return "text-[#499FFF] border-[#499FFF]"
      case "epic": return "text-purple-400 border-purple-400"
      case "legendary": return "text-yellow-400 border-yellow-400"
      default: return "text-[#DCEFFF] border-[#DCEFFF]"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "shadow-yellow-400/50"
      case "epic": return "shadow-purple-400/50"
      case "rare": return "shadow-[#499FFF]/50"
      default: return "shadow-[#DCEFFF]/20"
    }
  }

  const getSectionClass = (id: string) => {
    return `transition-all duration-1000 ${
      visibleSections.has(id)
        ? "opacity-100 transform translate-y-0"
        : "opacity-0 transform translate-y-10"
    }`
  }

  return (
    <div className="bg-[#080F1A] text-[#DCEFFF] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#080F1A] via-[#274B75]/20 to-[#080F1A]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23499FFF" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center space-y-12 px-4">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              HALL OF FAME
            </h1>
            <p className="text-2xl md:text-3xl text-[#DCEFFF]/80 font-semibold">
              Where Legends Are Forged
            </p>
          </div>

          {/* Animated Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                {animatedStats.totalWins.toLocaleString()}
              </div>
              <div className="text-sm text-[#DCEFFF]/70">Tournaments Won</div>
            </div>
            <div className="text-center space-y-2">
              <Medal className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                ${animatedStats.totalEarnings.toLocaleString()}
              </div>
              <div className="text-sm text-[#DCEFFF]/70">Total Prize Pool</div>
            </div>
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 text-[#499FFF] mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                {animatedStats.championCount.toLocaleString()}
              </div>
              <div className="text-sm text-[#DCEFFF]/70">Champions</div>
            </div>
            <div className="text-center space-y-2">
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                {animatedStats.achievementCount.toLocaleString()}
              </div>
              <div className="text-sm text-[#DCEFFF]/70">Achievements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Guild Milestones Timeline */}
      <section id="milestones" className={`py-20 px-4 lg:px-6 ${getSectionClass("milestones")}`}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Our Journey to Greatness
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-[#499FFF] to-yellow-400 opacity-50" />
            
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-[#080F1A] z-10 animate-pulse" />
                
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[#499FFF]/50 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-[#499FFF] text-white">
                        {milestone.date}
                      </Badge>
                      {milestone.isNew && (
                        <Badge className="bg-green-500 text-white animate-pulse">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-[#499FFF] to-white bg-clip-text text-transparent">
                      {milestone.title}
                    </h3>
                    <p className="text-[#DCEFFF]/70 mb-4">{milestone.description}</p>
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Victories Showcase */}
      <section id="tournaments" className={`py-20 px-4 lg:px-6 bg-white/5 ${getSectionClass("tournaments")}`}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Championship Chronicles
          </h2>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Confetti Background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-40 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Tournament Carousel */}
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTournament((prev) => (prev - 1 + tournaments.length) % tournaments.length)}
                  className="border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTournament((prev) => (prev + 1) % tournaments.length)}
                  className="border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {tournaments.map((tournament, index) => (
                  <div
                    key={tournament.id}
                    className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-500 ${
                      index === currentTournament
                        ? 'scale-110 border-yellow-400/50 shadow-2xl shadow-yellow-400/20'
                        : 'scale-95 opacity-70'
                    }`}
                    style={{
                      transform: `perspective(1000px) rotateY(${(index - currentTournament) * 15}deg)`,
                    }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={tournament.image}
                        alt={tournament.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Medal */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          tournament.position === 1 ? 'bg-yellow-400' :
                          tournament.position === 2 ? 'bg-gray-300' : 'bg-orange-400'
                        }`}>
                          <span className="text-black font-bold">{tournament.position}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
                      <p className="text-[#DCEFFF]/70 mb-3">{tournament.game}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-green-400">
                          ${tournament.prize.toLocaleString()}
                        </div>
                        <div className="text-sm text-[#DCEFFF]/70">{tournament.date}</div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {tournament.players.map((player) => (
                          <Badge key={player} variant="outline" className="border-[#499FFF] text-[#499FFF]">
                            {player}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-[#499FFF] hover:bg-[#499FFF]/80 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        View Highlights
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Spotlight Grid */}
      <section id="players" className={`py-20 px-4 lg:px-6 ${getSectionClass("players")}`}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Legends of Synergy Guild
          </h2>
          
          <Tabs value={playerFilter} onValueChange={setPlayerFilter} className="w-full mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white/5 border border-white/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                All Time
              </TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                This Month
              </TabsTrigger>
              <TabsTrigger value="game" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                By Game
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPlayers.map((player) => (
              <div
                key={player.id}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[#499FFF]/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#499FFF]/20"
                style={{
                  transform: 'perspective(1000px)',
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget
                  const rect = card.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  const rotateX = (y / rect.height - 0.5) * -10
                  const rotateY = (x / rect.width - 0.5) * 10
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
                }}
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                  #{player.rank}
                </div>

                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <Image
                      src={player.avatar}
                      alt={player.username}
                      fill
                      className="rounded-full object-cover border-2 border-[#499FFF]"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-pulse opacity-50" />
                  </div>

                  <h3 className="text-xl font-bold text-white">{player.username}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#DCEFFF]/70">Tournaments:</span>
                      <span className="text-white font-semibold">{player.tournamentsWon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#DCEFFF]/70">Win Rate:</span>
                      <span className="text-green-400 font-semibold">{player.winRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#DCEFFF]/70">Earnings:</span>
                      <span className="text-yellow-400 font-semibold">${player.totalEarnings.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {player.badges.map((badge) => (
                      <Badge key={badge} className={getRarityColor(badge)}>
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-[#499FFF] hover:bg-[#499FFF]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Gallery */}
      <section id="achievements" className={`py-20 px-4 lg:px-6 bg-white/5 ${getSectionClass("achievements")}`}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Moments of Glory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`relative bg-white/5 backdrop-blur-md border rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group ${
                    getRarityColor(achievement.rarity)
                  } hover:shadow-2xl ${getRarityGlow(achievement.rarity)} ${
                    achievement.size === 'large' ? 'md:col-span-2' : 
                    achievement.size === 'small' ? 'md:col-span-1' : 'md:col-span-1'
                  }`}
                >
                  {achievement.rarity === 'legendary' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-xl animate-pulse" />
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      achievement.rarity === 'legendary' ? 'bg-yellow-400/20' :
                      achievement.rarity === 'epic' ? 'bg-purple-400/20' :
                      achievement.rarity === 'rare' ? 'bg-[#499FFF]/20' : 'bg-white/10'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        achievement.rarity === 'legendary' ? 'text-yellow-400' :
                        achievement.rarity === 'epic' ? 'text-purple-400' :
                        achievement.rarity === 'rare' ? 'text-[#499FFF]' : 'text-[#DCEFFF]'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
                      <p className="text-sm text-[#DCEFFF]/70 mb-2">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#499FFF]">{achievement.player}</span>
                        <span className="text-xs text-[#DCEFFF]/50">{achievement.date}</span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Live Leaderboard Widget */}
      <section id="leaderboard" className={`py-20 px-4 lg:px-6 ${getSectionClass("leaderboard")}`}>
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Current Champions
          </h2>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400 font-semibold">LIVE</span>
            </div>
            
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1 ? 'bg-yellow-400 text-black' :
                    entry.rank === 2 ? 'bg-gray-300 text-black' :
                    entry.rank === 3 ? 'bg-orange-400 text-black' : 'bg-white/20 text-white'
                  }`}>
                    {entry.rank}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-white">{entry.player}</div>
                    <div className="text-sm text-[#DCEFFF]/70">{entry.points} points</div>
                  </div>
                  
                  <div className={`flex items-center gap-1 text-sm ${
                    entry.change > 0 ? 'text-green-400' :
                    entry.change < 0 ? 'text-red-400' : 'text-[#DCEFFF]/70'
                  }`}>
                    {entry.change > 0 && <TrendingUp className="w-4 h-4" />}
                    {entry.change !== 0 && Math.abs(entry.change)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Fame Section */}
      <section id="wall-of-fame" className={`py-20 px-4 lg:px-6 bg-white/5 ${getSectionClass("wall-of-fame")}`}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Immortalized in Glory
          </h2>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              {wallOfFame.map((member) => (
                <div
                  key={member.id}
                  className="relative group"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  <div className="bg-gradient-to-br from-yellow-400/20 to-[#499FFF]/20 p-8 h-64 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-400/30">
                    <div className="relative w-16 h-16 mb-4">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover border-2 border-yellow-400"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-pulse" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-yellow-400 font-semibold mb-2">{member.title}</p>
                    <p className="text-xs text-[#DCEFFF]/70">{member.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-6 bg-gradient-to-r from-[#274B75] to-[#499FFF]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join the Ranks of Champions
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Think you have what it takes?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#499FFF] hover:bg-white/90 font-semibold px-8 py-3">
              <Users className="w-5 h-5 mr-2" />
              Join Our Guild
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#499FFF] font-semibold px-8 py-3">
              <Trophy className="w-5 h-5 mr-2" />
              View Tournaments
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}