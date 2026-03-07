// components/RealityCheck.jsx — Marketing hook section
"use client";
export default function RealityCheck() {
  const stats = [
    { value: "50%+", label: "of students who start college never finish" },
    { value: "43%", label: "of graduates are underemployed in their first job" },
    { value: "65%", label: "of jobs require experience most students don't have" },
  ];

  return (
    <section className="relative py-16 px-[5vw] overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1c1c1c 0%, #003b5c 100%)" }}>

      {/* Decorative accent */}
      <div className="absolute w-[500px] h-[500px] rounded-full top-[-200px] left-[-150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,150,43,.1) 0%, transparent 60%)" }} />

      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Attention hook */}
        <div className="reveal">
          <p className="text-gold-light text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-4
            flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-light">
            Let's be real
          </p>

          <h2 className="font-display font-bold text-[clamp(1.6rem,3vw,2.5rem)] text-white leading-[1.15] tracking-tight mb-6">
            Ever seen a job posting and thought,{" "}
            <span className="text-gold-light italic">&ldquo;I don&rsquo;t even qualify&rdquo;</span>?
          </h2>

          <p className="text-white/70 text-[0.95rem] leading-relaxed max-w-[700px] mb-4">
            You&rsquo;re not alone. Millions of students finish a degree and still struggle to land a job
            that matches it. And more than half who start college never cross the finish line at all.
          </p>
          <p className="text-white/70 text-[0.95rem] leading-relaxed max-w-[700px] mb-8">
            The missing piece isn&rsquo;t more lectures &mdash; it&rsquo;s <span className="text-white font-semibold">real projects,
            real connections, and real skills</span> you can point to. That&rsquo;s what opens doors.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <div key={s.label}
              className={`bg-white/6 border border-white/10 rounded-2xl p-5 text-center reveal reveal-delay-${i + 1}`}>
              <div className="font-display font-black text-[2.2rem] text-gold-light leading-none mb-2">
                {s.value}
              </div>
              <p className="text-white/60 text-[0.78rem] leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* The pitch */}
        <div className="bg-gold-DEFAULT/10 border border-gold-DEFAULT/20 rounded-2xl px-7 py-6 reveal">
          <p className="text-white text-[1.05rem] font-display font-medium leading-relaxed mb-3">
            Project-based experience builds what classrooms alone can&rsquo;t:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "🤝", text: "Networks & connections that get you hired" },
              { icon: "🛠️", text: "Portfolio-ready skills employers actually want" },
              { icon: "🚀", text: "Confidence to say \"I built this\" in any interview" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-white/80 text-[0.85rem] leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-gold-light text-[0.85rem] font-semibold mt-5">
            Don&rsquo;t wait for permission. Start building now.
          </p>
        </div>
      </div>
    </section>
  );
}
