"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Timeline from "@/components/timeline"
import Prizes from "@/components/prizes"
import Themes from "@/components/themes"
import FAQ from "@/components/faq"
import Sponsors from "@/components/sponsors"
import Footer from "@/components/footer"
import CinematicIntro from "@/components/cinematic-intro"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const introSeen = sessionStorage.getItem("introSeen")
    if (introSeen === "true") {
      setShowIntro(false)
      setHasSeenIntro(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setHasSeenIntro(true)
    sessionStorage.setItem("introSeen", "true")
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <main className="w-full overflow-x-hidden bg-gradient-to-b from-background via-background to-secondary/10">
        <Navigation />
        <Hero />
        <About />
        <Timeline />
        <Prizes />
        <Themes />
        <FAQ />
        <Sponsors />
        <Footer />
      </main>
    </>
  )
}
