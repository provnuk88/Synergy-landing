"use client"

import { Gamepad2 } from "lucide-react"
import GameCard from "./GameCard"

interface GameGridProps {
  games: any[]
  title?: string
}

export default function GameGrid({ games, title = "All Games" }: GameGridProps) {
  return (
    <section className="py-12 px-4 lg:px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Gamepad2 className="w-8 h-8 text-[#499FFF]" />
          {title} ({games.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center py-20">
            <Gamepad2 className="w-16 h-16 text-[#DCEFFF]/30 mx-auto mb-4" />
            <p className="text-xl text-[#DCEFFF]/70">No games found matching your criteria</p>
          </div>
        )}
      </div>
    </section>
  )
}