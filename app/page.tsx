"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Timeline from "@/components/timeline"
import Prizes from "@/components/prizes"
import Themes from "@/components/themes"
import FAQ from "@/components/faq"
import Sponsors from "@/components/sponsors"
import Footer from "@/components/footer"

export default function Home() {
  return (
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
  )
}
