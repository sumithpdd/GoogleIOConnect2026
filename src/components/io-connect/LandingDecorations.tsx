'use client';

/** Animated Google-colored decorative orbs — inspired by I/O Connect Berlin RSVP art. */
export function LandingDecorations() {
  return (
    <div className="landing-decorations" aria-hidden>
      <span className="landing-orb landing-orb--blue" />
      <span className="landing-orb landing-orb--green" />
      <span className="landing-orb landing-orb--yellow" />
      <span className="landing-orb landing-orb--red" />
      <div className="landing-brace landing-brace--left">{'{'}</div>
      <div className="landing-brace landing-brace--right">{'}'}</div>
    </div>
  );
}

/** Festive string lights across the hero — GDG London photobooth style. */
export function FestiveLights() {
  const colors = ['#EA4335', '#4285F4', '#FBBC04', '#34A853'];

  return (
    <div className="festive-lights" aria-hidden>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16">
        <path
          d="M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 30 + i * 48;
          const y = 40 + Math.sin(i * 0.8) * 12;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill={colors[i % colors.length]}
              className="festive-bulb"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}
