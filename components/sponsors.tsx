export default function Sponsors() {
  const sponsors = [
    { name: "TechCorp", color: "bg-blue-500/10 border-blue-500/30" },
    { name: "InnovateLabs", color: "bg-purple-500/10 border-purple-500/30" },
    { name: "CloudSync", color: "bg-cyan-500/10 border-cyan-500/30" },
    { name: "DevTools", color: "bg-green-500/10 border-green-500/30" },
  ]

  return (
    <section id="sponsors" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Our <span className="text-accent">Partners</span>
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          Supported by leading companies and organizations
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className={`${sponsor.color} border rounded-lg p-8 flex items-center justify-center h-32 hover:scale-105 transition-transform duration-300`}
            >
              <span className="font-bold text-lg text-foreground text-center">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
