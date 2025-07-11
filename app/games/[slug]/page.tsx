"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ChevronRight,
  Star,
  Users,
  Calendar,
  Monitor,
  Smartphone,
  Globe,
  ExternalLink,
  Twitter,
  MessageCircle,
  Youtube,
  Play,
  Trophy,
  Coins,
  Target,
  Clock,
  User,
  BookOpen,
  Zap,
  Shield,
  Gamepad2,
  TrendingUp,
  Gift,
  ArrowRight,
} from "lucide-react"

// Mock game data
const gameData = {
  apeiron: {
    name: "Apeiron",
    developer: "Foonie Magus",
    publisher: "Apeiron Studios",
    status: "Released",
    platforms: ["PC", "Mobile"],
    blockchain: "ETH",
    genre: ["Action", "RPG", "God Game"],
    releaseDate: "2024-03-15",
    rating: 4.8,
    players: "125K",
    heroImage: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1600",
    logo: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=200",
    description: "Apeiron is a revolutionary god game that combines classic gameplay with modern blockchain technology. Players take on the role of a god, managing planets and their inhabitants while earning real rewards through strategic gameplay and NFT ownership.",
    trailer: "dQw4w9WgXcQ",
    features: [
      { icon: "🌍", title: "Planet Management", description: "Control entire worlds and shape civilizations" },
      { icon: "⚔️", title: "Epic Battles", description: "Lead armies in strategic combat scenarios" },
      { icon: "💎", title: "NFT Integration", description: "Own unique planets, avatars, and items as NFTs" },
      { icon: "🏆", title: "Competitive Seasons", description: "Participate in ranked seasons with rewards" },
    ],
    screenshots: [
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    guides: [
      { title: "Getting Started Guide", author: "GameMaster", date: "2024-01-15", readTime: "5 min", difficulty: "Beginner" },
      { title: "Advanced Planet Management", author: "ProGamer", date: "2024-01-10", readTime: "12 min", difficulty: "Advanced" },
      { title: "Earning Strategies", author: "CryptoGamer", date: "2024-01-08", readTime: "8 min", difficulty: "Earning" },
    ],
    quests: [
      { title: "Complete Tutorial", progress: 100, reward: "100 APRS", status: "completed" },
      { title: "Win 5 Battles", progress: 60, reward: "250 APRS", status: "active" },
      { title: "Upgrade Planet to Level 10", progress: 30, reward: "500 APRS + NFT", status: "active" },
    ],
    socialLinks: {
      website: "https://apeiron.com",
      twitter: "https://twitter.com/apeirongame",
      discord: "https://discord.gg/apeiron",
      youtube: "https://youtube.com/apeiron",
    }
  }
}

const relatedGames = [
  {
    id: 2,
    slug: "guild-of-guardians",
    title: "Guild of Guardians",
    image: "https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    genre: ["RPG", "Strategy"],
  },
  {
    id: 3,
    slug: "seraph",
    title: "Seraph",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    genre: ["RPG", "Fantasy"],
  },
  {
    id: 4,
    slug: "spellborne",
    title: "Spellborne",
    image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    genre: ["Strategy", "Card"],
  },
  {
    id: 5,
    slug: "tokyo-beast",
    title: "Tokyo Beast",
    image: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    genre: ["Action", "Battle"],
  },
]

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [guideFilter, setGuideFilter] = useState("all")
  
  const game = gameData[params.slug as keyof typeof gameData] || gameData.apeiron

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

  const filteredGuides = guideFilter === "all" 
    ? game.guides 
    : game.guides.filter(guide => guide.difficulty.toLowerCase() === guideFilter)

  return (
    <div className="bg-[#080F1A] text-[#DCEFFF] min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={game.heroImage}
          alt={game.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080F1A] via-[#080F1A]/50 to-transparent" />
        
        {/* Breadcrumbs */}
        <div className="absolute top-8 left-8 z-10">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#DCEFFF]/70 hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#DCEFFF]/50" />
            <Link href="/games" className="text-[#DCEFFF]/70 hover:text-white transition-colors">
              Games
            </Link>
            <ChevronRight className="w-4 h-4 text-[#DCEFFF]/50" />
            <span className="text-white">{game.name}</span>
          </nav>
        </div>

        {/* Game Logo */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/20">
              <Image
                src={game.logo}
                alt={`${game.name} logo`}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{game.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold">{game.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-[#DCEFFF]/70" />
                  <span>{game.players} players</span>
                </div>
                <Badge className={`${getStatusColor(game.status)} text-white`}>
                  {game.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10">
                <TabsTrigger value="overview" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="gameplay" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                  Gameplay
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                  Features
                </TabsTrigger>
                <TabsTrigger value="guides" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                  Guides
                </TabsTrigger>
                <TabsTrigger value="quests" className="data-[state=active]:bg-[#499FFF] data-[state=active]:text-white">
                  Quests
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8 mt-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">About {game.name}</h2>
                  <p className="text-lg text-[#DCEFFF]/80 leading-relaxed mb-6">
                    {game.description}
                  </p>
                  <p className="text-[#DCEFFF]/70 leading-relaxed">
                    Experience the next generation of gaming where your strategic decisions not only shape virtual worlds but also generate real-world value. With cutting-edge blockchain integration and immersive gameplay mechanics, this title represents the future of interactive entertainment.
                  </p>
                </div>

                {/* Trailer */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Game Trailer</h3>
                  <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button className="bg-[#499FFF] hover:bg-[#499FFF]/80 text-white">
                        <Play className="w-6 h-6 mr-2" />
                        Watch Trailer
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {game.features.map((feature, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-3xl mb-3">{feature.icon}</div>
                        <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-[#DCEFFF]/70">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screenshot Gallery */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Screenshots</h3>
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <Image
                        src={game.screenshots[selectedScreenshot]}
                        alt={`${game.name} screenshot ${selectedScreenshot + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {game.screenshots.map((screenshot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedScreenshot(index)}
                          className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                            selectedScreenshot === index 
                              ? 'border-[#499FFF]' 
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <Image
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Gameplay Tab */}
              <TabsContent value="gameplay" className="space-y-8 mt-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Game Mechanics</h2>
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5 text-[#499FFF]" />
                        Core Gameplay
                      </h3>
                      <p className="text-[#DCEFFF]/80">
                        Master the art of divine intervention as you guide civilizations through their evolution. 
                        Balance resource management, strategic combat, and diplomatic relations to build thriving worlds.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#499FFF]" />
                        Controls Guide
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-[#DCEFFF]/80"><kbd className="bg-white/10 px-2 py-1 rounded">WASD</kbd> - Move camera</p>
                          <p className="text-[#DCEFFF]/80"><kbd className="bg-white/10 px-2 py-1 rounded">Mouse</kbd> - Select/Interact</p>
                          <p className="text-[#DCEFFF]/80"><kbd className="bg-white/10 px-2 py-1 rounded">Space</kbd> - Pause/Resume</p>
                        </div>
                        <div>
                          <p className="text-[#DCEFFF]/80"><kbd className="bg-white/10 px-2 py-1 rounded">Q/E</kbd> - Rotate view</p>
                          <p className="text-[#DCEFFF]/80"><kbd className="bg-white/10 px-2 py-1 rounded">Tab</kbd> - Open menu</p>
                          <p className="text-[#DCEFFF]/80"><kbd className="bg-white/10 px-2 py-1 rounded">Esc</kbd> - Settings</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#499FFF]" />
                        Tips & Strategies
                      </h3>
                      <ul className="space-y-2 text-[#DCEFFF]/80">
                        <li>• Focus on resource balance in early game development</li>
                        <li>• Build defensive structures before expanding territory</li>
                        <li>• Participate in seasonal events for exclusive rewards</li>
                        <li>• Join guild activities to maximize earning potential</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="space-y-8 mt-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Game Features</h2>
                  
                  <div className="space-y-8">
                    {/* Tokenomics */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Coins className="w-6 h-6 text-[#499FFF]" />
                        Tokenomics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#499FFF] mb-2">APRS</div>
                          <p className="text-sm text-[#DCEFFF]/70">Governance Token</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-400 mb-2">ANIMA</div>
                          <p className="text-sm text-[#DCEFFF]/70">Utility Token</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-400 mb-2">NFTs</div>
                          <p className="text-sm text-[#DCEFFF]/70">Planets & Avatars</p>
                        </div>
                      </div>
                    </div>

                    {/* NFT Collections */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-[#499FFF]" />
                        NFT Collections
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { name: "Planets", count: "10,000", rarity: "Legendary" },
                          { name: "Avatars", count: "25,000", rarity: "Epic" },
                          { name: "Weapons", count: "50,000", rarity: "Rare" },
                        ].map((collection, index) => (
                          <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h4 className="font-semibold text-white mb-2">{collection.name}</h4>
                            <p className="text-sm text-[#DCEFFF]/70 mb-1">Supply: {collection.count}</p>
                            <Badge variant="outline" className="border-[#499FFF] text-[#499FFF]">
                              {collection.rarity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Earning Mechanics */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Gift className="w-6 h-6 text-[#499FFF]" />
                        Earning Mechanics
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-white">Daily Quests</h4>
                            <p className="text-sm text-[#DCEFFF]/70">Complete daily objectives</p>
                          </div>
                          <div className="text-green-400 font-semibold">50-200 APRS</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-white">PvP Battles</h4>
                            <p className="text-sm text-[#DCEFFF]/70">Win ranked matches</p>
                          </div>
                          <div className="text-green-400 font-semibold">100-500 APRS</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-white">Seasonal Events</h4>
                            <p className="text-sm text-[#DCEFFF]/70">Participate in special events</p>
                          </div>
                          <div className="text-green-400 font-semibold">1000+ APRS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Guides Tab */}
              <TabsContent value="guides" className="space-y-8 mt-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">Game Guides</h2>
                    <div className="flex gap-2">
                      <Button
                        variant={guideFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setGuideFilter("all")}
                        className={guideFilter === "all" ? "bg-[#499FFF]" : "border-[#499FFF] text-[#499FFF]"}
                      >
                        All
                      </Button>
                      <Button
                        variant={guideFilter === "beginner" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setGuideFilter("beginner")}
                        className={guideFilter === "beginner" ? "bg-[#499FFF]" : "border-[#499FFF] text-[#499FFF]"}
                      >
                        Beginner
                      </Button>
                      <Button
                        variant={guideFilter === "advanced" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setGuideFilter("advanced")}
                        className={guideFilter === "advanced" ? "bg-[#499FFF]" : "border-[#499FFF] text-[#499FFF]"}
                      >
                        Advanced
                      </Button>
                      <Button
                        variant={guideFilter === "earning" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setGuideFilter("earning")}
                        className={guideFilter === "earning" ? "bg-[#499FFF]" : "border-[#499FFF] text-[#499FFF]"}
                      >
                        Earning
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredGuides.map((guide, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#499FFF]/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">{guide.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-[#DCEFFF]/70">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {guide.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {guide.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {guide.readTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`
                                ${guide.difficulty === 'Beginner' ? 'border-green-500 text-green-400' : ''}
                                ${guide.difficulty === 'Advanced' ? 'border-red-500 text-red-400' : ''}
                                ${guide.difficulty === 'Earning' ? 'border-yellow-500 text-yellow-400' : ''}
                              `}
                            >
                              {guide.difficulty}
                            </Badge>
                            <ArrowRight className="w-5 h-5 text-[#499FFF]" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Quests Tab */}
              <TabsContent value="quests" className="space-y-8 mt-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Active Quests</h2>
                  
                  <div className="space-y-6">
                    {game.quests.map((quest, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">{quest.title}</h3>
                            <div className="flex items-center gap-2">
                              <Trophy className="w-5 h-5 text-yellow-400" />
                              <span className="text-[#499FFF] font-semibold">{quest.reward}</span>
                            </div>
                          </div>
                          <Badge 
                            className={`
                              ${quest.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'} 
                              text-white
                            `}
                          >
                            {quest.status === 'completed' ? 'Completed' : 'Active'}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#DCEFFF]/70">Progress</span>
                            <span className="text-white">{quest.progress}%</span>
                          </div>
                          <Progress value={quest.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-8">
                    <Button className="bg-[#499FFF] hover:bg-[#499FFF]/80 text-white">
                      <Zap className="w-5 h-5 mr-2" />
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              {/* Game Information */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">GAME INFORMATION</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#DCEFFF]/70">Developer:</span>
                    <span className="text-white">{game.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCEFFF]/70">Publisher:</span>
                    <span className="text-white">{game.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCEFFF]/70">Status:</span>
                    <Badge className={`${getStatusColor(game.status)} text-white`}>
                      {game.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCEFFF]/70">Platforms:</span>
                    <div className="flex gap-2">
                      {game.platforms.includes('PC') && <Monitor className="w-4 h-4 text-[#DCEFFF]" />}
                      {game.platforms.includes('Mobile') && <Smartphone className="w-4 h-4 text-[#DCEFFF]" />}
                      {game.platforms.includes('Browser') && <Globe className="w-4 h-4 text-[#DCEFFF]" />}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCEFFF]/70">Chain:</span>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {getBlockchainIcon(game.blockchain)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCEFFF]/70">Genre:</span>
                    <div className="flex flex-wrap gap-1">
                      {game.genre.map((g) => (
                        <Badge key={g} variant="outline" className="border-orange-500 text-orange-400 text-xs">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCEFFF]/70">Release:</span>
                    <span className="text-white">{game.releaseDate}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">SOCIAL LINKS</h3>
                <div className="space-y-3">
                  <a href={game.socialLinks.website} className="flex items-center gap-3 text-[#DCEFFF]/70 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                    Official Website
                  </a>
                  <a href={game.socialLinks.twitter} className="flex items-center gap-3 text-[#DCEFFF]/70 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </a>
                  <a href={game.socialLinks.discord} className="flex items-center gap-3 text-[#DCEFFF]/70 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    Discord
                  </a>
                  <a href={game.socialLinks.youtube} className="flex items-center gap-3 text-[#DCEFFF]/70 hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                    YouTube
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[#499FFF] to-[#274B75] hover:from-[#274B75] hover:to-[#499FFF] text-white font-semibold py-3">
                  <Play className="w-5 h-5 mr-2" />
                  Play Now
                </Button>
                <Button variant="outline" className="w-full border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
              </div>

              {/* Join the Wardens */}
              <div className="bg-gradient-to-br from-[#499FFF]/20 to-[#274B75]/20 border border-[#499FFF]/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">JOIN THE WARDENS</h3>
                <p className="text-[#DCEFFF]/80 text-sm mb-4">
                  Connect with elite players, share strategies, and participate in exclusive guild events. 
                  Level up your gaming experience with our community.
                </p>
                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Join Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Games */}
      <section className="py-20 px-4 lg:px-6 bg-white/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Similar Games You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedGames.map((relatedGame) => (
              <Link key={relatedGame.id} href={`/games/${relatedGame.slug}`}>
                <div className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#499FFF]/50 hover:scale-105 transition-all duration-300">
                  <div className="relative aspect-video">
                    <Image
                      src={relatedGame.image}
                      alt={relatedGame.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-[#499FFF] transition-colors">
                      {relatedGame.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {relatedGame.genre.map((g) => (
                          <Badge key={g} variant="outline" className="border-orange-500 text-orange-400 text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-[#DCEFFF]/70">{relatedGame.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}