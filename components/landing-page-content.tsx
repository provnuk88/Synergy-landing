"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Settings,
  Users,
  Trophy,
  Shield,
  Zap,
  Heart,
  Globe,
  Star,
  Gamepad2,
  Copy,
} from "lucide-react"
import Image from "next/image"

const featuredNews = [
  {
    title: "Tokyo Beast: Крупнейший Чемпионат с Большими Призовыми",
    description:
      "Крупнейший турнир Tokyo Beast стартует 21 июня. Крупнейший турнир Tokyo Beast стартует в эту субботу...",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
  {
    title: "Guild of Guardians: 15 Сезон уже Здесь!",
    description:
      "15 Сезон Guild of Guardians Уже Доступен Guild of Guardians запустила 15 сезон, четырехнедельное соревнование...",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
  {
    title: "Seraph: Третий Сезон уже Запущен!",
    description:
      "Третий Сезон Seraph с 5000000 $SERAPH Призовых Уже Доступен Темная фэнтезийная блокчейн-RPG Seraph...",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
  {
    title: "Spellborne: Новый Ивент Enchanted Guild Wars",
    description:
      "Новый Ивент в Spellborne с Призовым Фондом 250k $BONE Разработчик инди-игр Mon Studios запустили ивент...",
    imageUrl: "/placeholder.svg?width=400&height=300",
  },
]

export default function LandingPageContent() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [copied, setCopied] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const slides = [
    {
      title: "Unite. Compete. Conquer.",
      subtitle: "Synergy Guild: The Nexus of Competitive Web3 Gaming",
      description:
        "We are the premier destination for elite gamers, offering unparalleled support, top-tier tournaments, and a thriving community.",
    },
    {
      title: "Our Services",
      subtitle: "Comprehensive Gaming Solutions",
      description: "From community management to tournament organization",
    },
    {
      title: "User Interface",
      subtitle: "Cutting-Edge Gaming Experience",
      description: "Advanced features designed for competitive gaming",
    },
  ]

  // Intersection Observer for section reveals
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" },
    )

    const sections = ["hero", "featured-news", "about", "services", "partners", "contact"]
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

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getSectionClass = (id: string) => {
    return `py-20 relative transition-all ease-in-out duration-1000 ${
      visibleSections.has(id)
        ? "opacity-100 transform translate-y-0 scale-100"
        : "opacity-0 transform translate-y-10 scale-95"
    }`
  }

  return (
    <div className="overflow-x-hidden bg-[#080F1A]">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        {/* Animated Aurora Background */}
        <div className="aurora-bg absolute inset-0">
          <div className="aurora-dot"></div>
          <div className="aurora-dot"></div>
          <div className="aurora-dot"></div>
          <div className="aurora-dot"></div>
        </div>

        {/* Ice Crystal Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
          {[...Array(15)].map((_, i) => (
            <div
              key={`crystal-${i}`}
              className="absolute w-1 h-1 bg-[#DCEFFF] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
              {/* Left Side - Text Slider */}
              <div className="space-y-8 text-center lg:text-left p-8">
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === currentSlide
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-0 transform translate-y-8"
                      }`}
                    >
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                          {slide.title}
                        </h1>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#499FFF]">
                          {slide.subtitle}
                        </h2>
                        <p className="text-lg md:text-xl text-[#DCEFFF]/80 max-w-2xl">{slide.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slide Controls */}
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white bg-transparent transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-[#499FFF]/50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? "bg-[#499FFF] scale-125" : "bg-[#274B75] hover:bg-[#499FFF]/50"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white bg-transparent transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-[#499FFF]/50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#274B75] to-[#499FFF] hover:from-[#499FFF] hover:to-[#274B75] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#499FFF]/25 active:scale-95"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join Discord
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => scrollToSection("services")}
                    className="border-2 border-[#499FFF] text-[#499FFF] hover:bg-[#499FFF] hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 bg-transparent active:scale-95"
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Our Services
                  </Button>
                </div>
              </div>

              {/* Right Side - Logo with Ice Crystals */}
              <div className="relative flex items-center justify-center [perspective:1000px]">
                <div
                  className="relative group transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(var(--rotate-y))_rotateX(var(--rotate-x))_scale(1.05)]"
                  style={
                    {
                      "--rotate-x": "0deg",
                      "--rotate-y": "0deg",
                    } as React.CSSProperties
                  }
                  onMouseMove={(e) => {
                    const card = e.currentTarget
                    const rect = card.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const rotateX = (y / rect.height - 0.5) * -15
                    const rotateY = (x / rect.width - 0.5) * 15
                    card.style.setProperty("--rotate-x", `${rotateX}deg`)
                    card.style.setProperty("--rotate-y", `${rotateY}deg`)
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget
                    card.style.setProperty("--rotate-x", "0deg")
                    card.style.setProperty("--rotate-y", "0deg")
                  }}
                >
                  <div className="relative w-96 h-96 lg:w-[480px] lg:h-[480px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#499FFF]/20 to-[#274B75]/20 rounded-full blur-3xl animate-pulse" />
                    <div className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 transition-all duration-500 cursor-pointer [transform:translateZ(40px)]">
                      <Image
                        src="/synergy-logo.png"
                        alt="Synergy Guild Logo"
                        width={384}
                        height={384}
                        className="transform -scale-x-100 drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection("featured-news")}
        >
          <div className="w-6 h-10 border-2 border-[#499FFF] rounded-full flex justify-center hover:border-[#499FFF]/80 transition-colors duration-300">
            <div className="w-1 h-3 bg-[#499FFF] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section id="featured-news" className={getSectionClass("featured-news")}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Featured News</h2>
            <p className="text-xl text-[#DCEFFF]/70 max-w-2xl mx-auto">
              Stay updated with our latest tournaments, partnerships, and community events
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredNews.map((news, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={news.imageUrl || "/placeholder.svg"}
                    alt={news.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-[#DCEFFF]/70">{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className={getSectionClass("about")}>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">About Us</h2>
            <p className="text-xl text-[#DCEFFF]/70 max-w-3xl mx-auto">
              Our innovative approach combines traditional gaming excellence with cutting-edge Web3 technologies.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 [perspective:1000px]">
            {[
              { icon: Users, title: "Global Community", description: "Connecting gamers worldwide." },
              { icon: Trophy, title: "Tournament Hosting", description: "Professional and community events." },
              { icon: Shield, title: "Secure Platform", description: "Your assets and data are safe." },
              { icon: Zap, title: "Fast Matchmaking", description: "Get into games quicker." },
              { icon: Heart, title: "Player Support", description: "Dedicated 24/7 assistance." },
              { icon: Globe, title: "Multi-Region", description: "Servers across the globe." },
              { icon: Star, title: "Premium Features", description: "Unlock exclusive benefits." },
              {
                icon: Gamepad2,
                title: "Multi-Game Support",
                description: "We support all your favorite games.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(var(--rotate-y))_rotateX(var(--rotate-x))_scale(1.05)] hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20"
                  style={
                    {
                      "--rotate-x": "0deg",
                      "--rotate-y": "0deg",
                    } as React.CSSProperties
                  }
                  onMouseMove={(e) => {
                    const card = e.currentTarget
                    const rect = card.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const rotateX = (y / rect.height - 0.5) * -15
                    const rotateY = (x / rect.width - 0.5) * 15
                    card.style.setProperty("--rotate-x", `${rotateX}deg`)
                    card.style.setProperty("--rotate-y", `${rotateY}deg`)
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget
                    card.style.setProperty("--rotate-x", "0deg")
                    card.style.setProperty("--rotate-y", "0deg")
                  }}
                >
                  <div className="relative [transform:translateZ(20px)]">
                    <div className="flex justify-center mb-4">
                      <Icon className="w-10 h-10 text-[#499FFF] transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_10px_#499FFF]" />
                    </div>
                    <h4 className="font-bold text-lg text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-[#DCEFFF]/70">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={getSectionClass("services")}>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Service Packages</h2>
            <p className="text-xl text-[#DCEFFF]/70 max-w-2xl mx-auto">
              Choose the perfect tier for your gaming community needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Gold",
                subtitle: "Essential Gaming",
                color: "text-yellow-400",
                features: ["Community Management", "Basic Tournament Support", "Discord Integration", "Weekly Events"],
              },
              {
                name: "Platinum",
                subtitle: "Professional Gaming",
                color: "text-gray-200",
                features: [
                  "Everything in Gold",
                  "Advanced Analytics",
                  "Custom Tournaments",
                  "Priority Support",
                  "NFT Integration",
                ],
              },
              {
                name: "Diamond",
                subtitle: "Enterprise Gaming",
                color: "text-blue-400",
                features: [
                  "Everything in Platinum",
                  "White-label Solutions",
                  "Dedicated Account Manager",
                  "Custom Development",
                  "24/7 Premium Support",
                ],
              },
            ].map((tier, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 transition-all duration-500 transform hover:scale-105 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className={`text-3xl font-bold ${tier.color}`}>{tier.name}</h3>
                    <p className="text-[#DCEFFF]/70">{tier.subtitle}</p>
                  </div>
                  <ul className="space-y-4 text-left">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-[#499FFF] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-[#DCEFFF]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-[#274B75] to-[#499FFF] hover:from-[#499FFF] hover:to-[#274B75] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#499FFF]/30 active:scale-95">
                    Contact for Pricing
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className={getSectionClass("partners")}>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Our Partners</h2>
            <p className="text-xl text-[#DCEFFF]/70 max-w-2xl mx-auto">
              Trusted by leading gaming companies and Web3 platforms worldwide
            </p>
          </div>
        </div>
        <div className="relative w-full overflow-hidden group [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[
              { name: "GameCorp", logo: "GC" },
              { name: "Web3Games", logo: "W3" },
              { name: "eSports Pro", logo: "EP" },
              { name: "NFT Studio", logo: "NS" },
              { name: "BlockChain", logo: "BC" },
              { name: "GameTech", logo: "GT" },
            ]
              .concat([
                { name: "GameCorp", logo: "GC" },
                { name: "Web3Games", logo: "W3" },
                { name: "eSports Pro", logo: "EP" },
                { name: "NFT Studio", logo: "NS" },
                { name: "BlockChain", logo: "BC" },
                { name: "GameTech", logo: "GT" },
              ])
              .map((partner, index) => (
                <div key={index} className="flex-shrink-0 mx-4 w-40">
                  <div className="group/partner relative p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-400/50 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#274B75] to-[#499FFF] rounded-lg flex items-center justify-center group-hover/partner:from-[#499FFF] group-hover/partner:to-[#274B75] transition-all duration-500 transform group-hover/partner:rotate-6">
                        <span className="text-xl font-bold text-white">{partner.logo}</span>
                      </div>
                      <p className="text-sm text-[#DCEFFF]/70 group-hover/partner:text-white transition-colors duration-500 font-medium">
                        {partner.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={getSectionClass("contact")}>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
            <p className="text-xl text-[#DCEFFF]/70 max-w-2xl mx-auto">
              Ready to join the future of gaming? Let's build something amazing together.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "✉",
                title: "Email Us",
                content: "contact@synergyguild.com",
                action: "Copy",
                gradient: "from-[#499FFF] to-[#274B75]",
              },
              {
                icon: MessageCircle,
                title: "Join Discord",
                content: "Connect with our community",
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                icon: "𝕏",
                title: "Follow Us",
                content: "@SynergyGuild",
                gradient: "from-blue-400 to-blue-600",
              },
              {
                icon: "✈",
                title: "Telegram",
                content: "Join our channel",
                gradient: "from-blue-500 to-cyan-500",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-blue-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="flex items-center space-x-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${contact.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    {typeof contact.icon === "string" ? (
                      <span className="text-white text-2xl">{contact.icon}</span>
                    ) : (
                      <contact.icon className="text-white w-8 h-8" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-1">{contact.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#DCEFFF]/80 text-lg">{contact.content}</span>
                      {contact.action === "Copy" && (
                        <button
                          onClick={() => handleCopy(contact.content)}
                          className="text-blue-400 hover:text-white transition-colors duration-300 text-sm font-medium p-1 rounded-md hover:bg-blue-400/20"
                        >
                          {copied ? "Copied!" : <Copy className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141E30] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 lg:px-6 text-center text-[#DCEFFF]/70">
          <p className="text-sm">&copy; {new Date().getFullYear()} Synergy Guild. All rights reserved.</p>
        </div>
      </footer>
      <style jsx>{`
        @keyframes aurora-move {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.5;
          }
          25% {
            transform: translate(20vw, -30vh) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(-25vw, 20vh) rotate(180deg);
            opacity: 0.6;
          }
          75% {
            transform: translate(15vw, 35vh) rotate(270deg);
            opacity: 0.9;
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
            opacity: 0.5;
          }
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
          background-color: rgba(73, 159, 255, 0.3); /* #499FFF */
          top: 10%;
          left: 10%;
          animation-duration: 22s;
        }
        .aurora-dot:nth-child(2) {
          background-color: rgba(39, 75, 117, 0.4); /* #274B75 */
          top: 20%;
          left: 70%;
          animation-duration: 25s;
          animation-delay: -5s;
        }
        .aurora-dot:nth-child(3) {
          background-color: rgba(220, 239, 255, 0.2); /* #DCEFFF */
          top: 60%;
          left: 5%;
          animation-duration: 28s;
          animation-delay: -10s;
        }
        .aurora-dot:nth-child(4) {
          background-color: rgba(20, 30, 48, 0.5); /* #141E30 */
          top: 70%;
          left: 60%;
          animation-duration: 20s;
          animation-delay: -15s;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  )
}
