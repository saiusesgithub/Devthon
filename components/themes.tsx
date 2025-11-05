import { Lightbulb, Leaf, TrendingUp, Zap, Code, Globe } from "lucide-react"

export default function Themes() {
  const themes = [
    { name: "AI & Machine Learning", icon: Zap, color: "text-accent" },
    { name: "Sustainability", icon: Leaf, color: "text-green-400" },
    { name: "Fintech", icon: TrendingUp, color: "text-blue-400" },
    { name: "Open Innovation", icon: Lightbulb, color: "text-yellow-400" },
    { name: "Web3 & Blockchain", icon: Code, color: "text-purple-400" },
    { name: "Social Impact", icon: Globe, color: "text-cyan-400" },
  ]

  return (
    <section id="themes" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Hackathon <span className="text-accent">Themes</span>
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          Choose from these innovative themes or pitch your own idea
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => {
            const Icon = theme.icon
            return (
              <div
                key={index}
                className="glass-effect rounded-xl p-8 hover:bg-accent/10 transition-all duration-300 group cursor-pointer transform hover:scale-105 border border-accent/20 hover:border-accent/50"
              >
                <div className={`${theme.color} mb-4 transform group-hover:scale-125 transition-transform`}>
                  <Icon size={40} />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {theme.name}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
