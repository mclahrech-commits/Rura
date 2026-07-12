const REVIEWS = [
  {
    initials: 'AO',
    name: 'Amara Okonkwo',
    role: 'Farmer, Enugu',
    stars: 5,
    quote: 'Rura helped me sell my yam harvest directly to Lagos buyers. Profit up 34% this season.',
  },
  {
    initials: 'KL',
    name: 'Kemi Logistics Co.',
    role: 'Bulk Trader, Lagos',
    stars: 5,
    quote: 'Sourcing directly from farmers through Rura cut our procurement cost by nearly half.',
  },
  {
    initials: 'MS',
    name: 'Musa Suleiman',
    role: 'Herder, Kaduna',
    stars: 5,
    quote: 'The AI advisor told me exactly when to move my cattle. Best advice I\'ve had in years.',
  },
  {
    initials: 'FB',
    name: 'Fatima Bello',
    role: 'Crop Farmer, Kano',
    stars: 5,
    quote: 'I listed my sorghum and got 3 buyer offers within 24 hours. No broker needed at all.',
  },
  {
    initials: 'EB',
    name: 'Emeka Buyers Ltd',
    role: 'Trader, Onitsha',
    stars: 4,
    quote: 'Transparent pricing and verified farmers. We\'ve built long-term supply chains through Rura.',
  },
  {
    initials: 'HI',
    name: 'Halima Ibrahim',
    role: 'Dairy Farmer, Sokoto',
    stars: 5,
    quote: 'Tracking my herd with the livestock tool is like having a vet in my pocket every morning.',
  },
  {
    initials: 'TO',
    name: 'Taiwo Ogunleye',
    role: 'Farmer, Oyo',
    stars: 5,
    quote: 'The market price feed alone saved me from selling at the wrong time. Incredible platform.',
  },
  {
    initials: 'JN',
    name: 'Joseph Nwosu',
    role: 'Cassava Trader, Aba',
    stars: 4,
    quote: 'Direct access to hundreds of cassava farmers in one place. Game changer for my business.',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= count ? '#AB7A44' : '#d9ccc0', fontSize: 13 }}>★</span>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-5 flex flex-col gap-3"
      style={{
        width: 280,
        marginRight: 20,
        background: 'white',
        boxShadow: '0 4px 24px rgba(109,41,50,0.07)',
        border: '1px solid rgba(109,41,50,0.08)',
      }}
    >
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ background: '#6D2932', color: '#C7B7A3' }}
        >
          {review.initials}
        </div>
        <div>
          <div className="font-semibold text-sm leading-tight" style={{ color: '#6D2932' }}>
            {review.name}
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: '#AB7A44' }}>
            {review.role}
          </div>
        </div>
      </div>

      <StarRating count={review.stars} />

      <p
        className="text-xs leading-relaxed"
        style={{
          color: '#4a3728',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        "{review.quote}"
      </p>
    </div>
  )
}

export default function ReviewMarquee() {
  // Duplicate for seamless loop
  const doubled = [...REVIEWS, ...REVIEWS]

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: '#EDE5D8' }}
    >
      {/* Section label */}
      <div className="text-center mb-10 px-6">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
          style={{ background: '#6D2932', color: '#C7B7A3' }}
        >
          Farmer & Trader Reviews
        </span>
        <h2
          className="font-semibold"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(1.8rem,4vw,3rem)',
            color: '#6D2932',
            letterSpacing: '-0.02em',
          }}
        >
          Trusted by Thousands<br />
          <em className="font-normal" style={{ color: '#AB7A44' }}>Across Algeria.</em>
        </h2>
      </div>

      {/* Marquee wrapper — overflow:hidden is SAFE here (sibling of hero, not ancestor) */}
      <div
        className="relative"
        style={{
          /* Edge fade masks */
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          overflow: 'hidden',
        }}
      >
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 36s linear infinite;
            will-change: transform;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="marquee-track py-3 px-4">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
