export default function Sustain() {
  const items = [
    { icon:"📣", title:"Wanted Ads", desc:'Post targeted skill requests so exactly the right student can find you.', ex:'→ "Need: Python dev, 3 hrs/wk, MESA welcome"' },
    { icon:"💬", title:"Direct Reach-Out", desc:"Students send a short intro message to project leads directly. No hunting for emails.", ex:'→ "Hi, I\'m a CS 1C student interested in joining…"' },
    { icon:"📸", title:"Updates + Prototypes", desc:"Project leads post updates — including mockup screenshots and milestone notes.", ex:'→ "v0.2 prototype: see attached screenshot"' },
    { icon:"🔔", title:"30-Day Ping", desc:"Automated script checks project activity and sends a reminder if nothing updated in 30 days.", ex:"→ Task 4: Already built and running" },
    { icon:"🗂️", title:"Living Archive", desc:"Projects are never deleted — archived. The next generation picks up with full documentation.", ex:"→ Automatically archived, always searchable" },
    { icon:"🏅", title:"Profile Recognition", desc:"Every contribution shows on your student profile — visible to transfer universities and employers.", ex:'→ "Contributed to: 3 projects | 2 completed"' },
  ];
  return (
    <section className="py-20 px-[5vw] bg-white">
      <div className="reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">Built-in supports</p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">How StemBridge keeps projects alive.</h2>
        <p className="text-muted text-sm max-w-[560px] leading-loose">Six mechanisms that sustain participation rather than letting it fade.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {items.map((it,i) => (
          <div key={it.title} className={`rounded-2xl p-6 bg-white border border-green-DEFAULT/7
            hover:border-green-DEFAULT/20 hover:-translate-y-1 hover:shadow-md
            hover:bg-gradient-to-br hover:from-white hover:to-green-pale transition-all duration-200 reveal reveal-delay-${(i%3)+1}`}>
            <span className="text-[1.6rem] mb-3 block">{it.icon}</span>
            <h3 className="font-bold text-sm text-charcoal mb-1">{it.title}</h3>
            <p className="text-[0.78rem] text-muted leading-relaxed">{it.desc}</p>
            <p className="mt-2 pt-2 border-t border-sand text-[0.7rem] text-green-DEFAULT font-mono font-medium">{it.ex}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
