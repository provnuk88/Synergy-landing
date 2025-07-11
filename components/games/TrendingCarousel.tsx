"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import GameCard from "./GameCard"

interface TrendingCarouselProps {
  games: any[]
}

export default function TrendingCarousel({ games }: TrendingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, games.length - 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [games.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, games.length - 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, games.length - 2)) % Math.max(1, games.length - 2))
  }

  return (
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
            {games.map((game) => (
              <GameCard key={game.id} game={game} isCarousel />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}