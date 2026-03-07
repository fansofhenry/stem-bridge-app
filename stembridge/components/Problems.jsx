export default function Problems() {
  const barriers = [
    { n:"01", title:"High Demand, Low Access", desc:"Students apply for SLI spring internships but there aren't enough spots. Rejected by capacity, not effort." },
    { n:"02", title:"The Time Tax", desc:"Three heavy classes leave zero time to wander campus. If it isn't surfaced to you, it doesn't exist." },
    { n:"03", title:"The Chaos Factor", desc:"Club projects lack briefs and follow-up. Students show up once, don't know what to do, and disappear." },
    { n:"04", title:"The Graveyard Effect", desc:"When a student leader graduates, all their work and momentum vanish. StemBridge is the archive that prevents this." },
  ];
  return (
    <section id="about" className="py-20 px-[5vw] relative overflow-hidden"
      style={{background:"linear-gradient(135deg,#003b5c 0%,#002640 100%)"}}>
      <div className="absolute w-[600px] h-[600px] rounded-full top-[-200px] right-[-100px] pointer-events-none"
        style={{background:"radial-gradient(circle,rgba(201,150,43,.08) 0%,transparent 60%)"}} />
      <div className="reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-light mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-light">What the research found</p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-white tracking-tight mb-2">Four real barriers. One bridge.</h2>
        <p className="text-white/65 text-sm max-w-[560px] leading-loose">Student interviews across MESA, Puente, and Umoja revealed a consistent pattern.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {barriers.map((b,i) => (
          <div key={b.n} className={`bg-white/6 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-0.5 transition-all reveal reveal-delay-${i+1}`}>
            <div className="font-display font-black text-[3rem] text-gold-light leading-none mb-3 opacity-60">{b.n}</div>
            <h3 className="text-sm font-semibold text-white mb-2">{b.title}</h3>
            <p className="text-[0.8rem] text-white/58 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
      <blockquote className="mt-8 bg-gold-DEFAULT/8 border-l-4 border-gold-DEFAULT rounded-r-2xl px-7 py-5 max-w-[760px] reveal">
        <p className="text-[0.7rem] font-bold tracking-widest uppercase text-gold-light mb-2">Point of View Statement</p>
        <p className="text-white/72 text-[0.9rem] leading-loose font-display font-light italic">
          &ldquo;First-generation and low-income students reveal a critical gap between the desire for
          hands-on experience and actual campus opportunities. These students need a centralized,
          structured platform that removes the friction of discovering and joining well-defined campus projects.&rdquo;
        </p>
      </blockquote>
    </section>
  );
}
