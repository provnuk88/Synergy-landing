"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

interface GameFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedGenre: string
  setSelectedGenre: (genre: string) => void
  selectedPlatform: string
  setSelectedPlatform: (platform: string) => void
  selectedBlockchain: string
  setSelectedBlockchain: (blockchain: string) => void
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export default function GameFilters({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  selectedPlatform,
  setSelectedPlatform,
  selectedBlockchain,
  setSelectedBlockchain,
  activeFilter,
  setActiveFilter,
}: GameFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
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

      {/* Search Bar */}
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
  )
}