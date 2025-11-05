"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([])

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-accent to-primary opacity-60 animate-float pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.id * 0.15}s`,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Glowing orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <div className="inline-block mb-6 px-4 py-2 glass-effect rounded-full">
          <span className="text-accent font-semibold text-sm">Innovation Awaits</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-balance mb-6">
          <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            DEVUP FIRST-YEAR
          </span>
          <br />
          <span className="text-foreground">HACKATHON 2025</span>
        </h1>

        <p className="text-lg sm:text-xl text-foreground/80 mb-8 text-balance max-w-2xl mx-auto">
          Build. Collaborate. Innovate. Join the most exciting hackathon for first-year students.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-accent to-primary text-primary-foreground rounded-full font-bold text-lg hover:glow-neon transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Register Now
          </Link>
          <button className="px-8 py-4 glass-effect text-accent rounded-full font-bold text-lg hover:bg-accent/10 transition-all duration-300 border border-accent/50 hover:border-accent">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
