"use client"

import { useState, useEffect } from "react"

interface GameHeroProps {
  title: string
  subtitle: string
  children?: React.ReactNode
}

export default function GameHero({ title, subtitle, children }: GameHeroProps) {
  return (
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
            {title}
          </h1>
          <p className="text-2xl md:text-3xl text-[#DCEFFF]/80 max-w-4xl mx-auto">
            {subtitle}
          </p>
          
          {children && (
            <div className="mt-12">
              {children}
            </div>
          )}
        </div>
      </div>

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