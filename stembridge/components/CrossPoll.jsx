export default function CrossPoll() {
  const disciplines = [
    { icon:"💻", name:"Computer Science", desc:"Build the tools, models, and apps that power every discipline." },
    { icon:"🔬", name:"Science & Engineering", desc:"Bring domain expertise — biology, chemistry, environmental science." },
    { icon:"🌍", name:"Social Justice", desc:"Ground STEM work in community need and equity from day one." },
    { icon:"🎨", name:"Art & Design", desc:"Make complex data beautiful and communication accessible." },
    { icon:"📈", name:"Business", desc:"Turn a great idea into a sustainable project with a plan and pitch." },
    { icon:"✍️", name:"Communication", desc:"Write the story. Make the science land with a real audience." },
  ];
  const pairings = [
    { left:[["CS","bg-blue-100 text-blue-800"]], right:[["Social Justice","bg-green-100 text-green-800"]], desc:"Food insecurity dashboard surfacing Panther Pantry gaps", badge:"↑ Live" },
    { left:[["Science","bg-red-100 text-red-800"]], right:[["Design","bg-purple-100 text-purple-800"]], desc:"CRISPR explainer series making biotech accessible", badge:"↑ Seeking collabs" },
    { left:[["CS","bg-blue-100 text-blue-800"],["Business","bg-yellow-100 text-yellow-800"]], right:[["Equity","bg-green-100 text-green-800"]], desc:"First-gen resume builder translating campus experience", badge:"↑ In progress" },
  ];
  return (
    <section id="crosspoll" className="py-20 px-[5vw] bg-warm-white">
      <div className="reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">The core goal</p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">STEM cross-pollination — the whole point.</h2>
        <p className="text-muted text-sm max-w-[560px] leading-loose">The best projects happen when a CS student meets a biologist meets a designer.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {disciplines.map((d,i) => (
          <div key={d.name} className={`bg-white rounded-2xl p-5 text-center border-[1.5px] border-transparent
            hover:border-green-light hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default reveal reveal-delay-${(i%3)+1}`}>
            <span className="text-[1.75rem] mb-2 block">{d.icon}</span>
            <h4 className="font-bold text-sm text-charcoal mb-1">{d.name}</h4>
            <p className="text-[0.73rem] text-muted leading-snug">{d.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-3 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">Real pairings happening now</p>
        <div className="flex flex-col gap-2.5">
          {pairings.map((p,i) => (
            <div key={i} className="bg-white rounded-xl px-5 py-3 flex items-center gap-2 flex-wrap border border-green-DEFAULT/7 hover:shadow-md transition-all">
              {p.left.map(([l,c]) => <span key={l} className={`text-xs font-bold px-2 py-0.5 rounded-full ${c}`}>{l}</span>)}
              <span className="text-gold-DEFAULT font-bold">+</span>
              {p.right.map(([l,c]) => <span key={l} className={`text-xs font-bold px-2 py-0.5 rounded-full ${c}`}>{l}</span>)}
              <span className="text-gold-DEFAULT font-bold">→</span>
              <span className="text-[0.78rem] text-muted flex-1">{p.desc}</span>
              <span className="font-mono text-[0.68rem] font-bold text-green-DEFAULT bg-green-pale px-2 py-0.5 rounded">{p.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
