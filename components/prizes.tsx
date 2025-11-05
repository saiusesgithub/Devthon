export default function Prizes() {
  const prizes = [
    {
      rank: "Gold",
      amount: "₹5000",
      perks: ["Certificates", "Internship Opportunities", "Goody Bag"],
      icon: "🥇",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      rank: "Silver",
      amount: "₹3000",
      perks: ["Certificates", "Goody Bag", "Tech Merchandise"],
      icon: "🥈",
      color: "from-gray-400 to-gray-500",
      featured: true,
    },
    {
      rank: "Bronze",
      amount: "₹2000",
      perks: ["Certificates", "Goody Bag", "Discount Coupons"],
      icon: "🥉",
      color: "from-orange-600 to-orange-700",
    },
  ]

  return (
    <section id="prizes" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Amazing <span className="text-accent">Prizes</span>
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          Compete for incredible rewards and recognition
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {prizes.map((prize, index) => (
            <div key={index} className={`relative group ${prize.featured ? "md:scale-105" : ""}`}>
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${prize.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
              />

              <div
                className={`relative glass-effect rounded-2xl p-8 h-full flex flex-col ${prize.featured ? "ring-2 ring-accent" : ""}`}
              >
                {/* Medal Icon */}
                <div className="text-5xl mb-4">{prize.icon}</div>

                <h3 className="text-3xl font-bold text-foreground mb-2">{prize.rank}</h3>
                <div className="text-3xl font-bold text-accent mb-6">{prize.amount}</div>

                {/* Perks */}
                <div className="flex-grow mb-6">
                  <ul className="space-y-3">
                    {prize.perks.map((perk, perkIndex) => (
                      <li key={perkIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <span className="text-foreground/80">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    prize.featured
                      ? "bg-accent text-accent-foreground hover:shadow-lg hover:glow-cyan"
                      : "glass-effect text-accent hover:bg-accent/10 border border-accent/50"
                  }`}
                >
                  Aim for {prize.rank}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
