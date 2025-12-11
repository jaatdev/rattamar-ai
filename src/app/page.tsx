export default function Home() {
  return (
    <div className="min-h-screen aurora-bg">
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 text-center max-w-5xl">
          {/* Glowing Badge */}
          <div className="glass-panel px-6 py-3 rounded-full">
            <p className="text-sm font-medium text-clarity/80 tracking-wider">
              ⚡ PROJECT RM-X - PHASE 0 ⚡
            </p>
          </div>

          {/* Main Title with Gradient */}
          <h1 className="text-6xl md:text-8xl font-bold gradient-text animate-float">
            RattaMaar AI
          </h1>

          {/* Subtitle with Glow */}
          <p className="text-2xl md:text-4xl font-semibold text-glow">
            A Nightclub for Knowledge
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-clarity/70 max-w-2xl leading-relaxed">
            Welcome to the <span className="text-brain font-semibold">Cyber-Gurukul</span> experience.
            Where <span className="text-energy font-semibold">cutting-edge technology</span> meets
            the warmth of Indian education.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            {/* Card 1 - The Void */}
            <div className="glass-panel p-8 rounded-2xl transition-smooth hover:scale-105 hover:border-brain/30">
              <div className="text-4xl mb-4">🌑</div>
              <h3 className="text-xl font-bold text-clarity mb-2">The Void</h3>
              <p className="text-clarity/60 text-sm">
                Deep charcoal backgrounds that are easy on the eyes and premium to the soul.
              </p>
            </div>

            {/* Card 2 - The Brain */}
            <div className="glass-panel p-8 rounded-2xl transition-smooth hover:scale-105 hover:border-brain/30 animate-pulse-glow">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-brain mb-2">The Brain</h3>
              <p className="text-clarity/60 text-sm">
                Electric violet accents representing intelligence, magic, and cognitive power.
              </p>
            </div>

            {/* Card 3 - The Energy */}
            <div className="glass-panel p-8 rounded-2xl transition-smooth hover:scale-105 hover:border-energy/30">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-energy mb-2">The Energy</h3>
              <p className="text-clarity/60 text-sm">
                Neon saffron bringing the warmth and fire of Indian heritage to modern design.
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-16 glass-panel px-8 py-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-energy animate-pulse"></div>
              <p className="text-lg font-medium text-clarity">
                <span className="text-brain font-bold">System Status:</span> Foundation Initialized ✓
              </p>
            </div>
            <p className="text-sm text-clarity/60 mt-3">
              Next.js 15 • TypeScript • Tailwind v4 • Shadcn UI • Framer Motion
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center pb-8">
        <p className="text-clarity/40 text-sm">
          Built with 🧠 for the future of learning
        </p>
      </footer>
    </div>
  );
}

