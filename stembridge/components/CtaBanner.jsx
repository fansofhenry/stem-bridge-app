// components/CtaBanner.jsx — CLIENT component (dispatches custom events)
"use client";
export default function CtaBanner() {
  return (
    <section id="start-project" className="py-28 px-[5vw] text-center relative overflow-hidden"
      style={{background:"linear-gradient(135deg,#003b5c 0%,#002640 60%,#00334f 100%)"}}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E\")"}} />
      <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-light mb-2 flex items-center justify-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-light after:content-[''] after:w-4 after:h-[1.5px] after:bg-gold-light relative z-10">Join the movement</p>
      <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-white tracking-tight mb-3 max-w-[580px] mx-auto relative z-10">Don&apos;t let your idea go to the graveyard.</h2>
      <p className="text-white/65 text-sm max-w-[480px] mx-auto mb-8 leading-loose relative z-10">Every project on StemBridge is a blueprint the next generation can build on.</p>
      <div className="flex gap-3 justify-center flex-wrap relative z-10">
        <a href="#search-anchor" className="bg-gold-DEFAULT text-white px-8 py-3 rounded-xl font-bold text-sm no-underline
          hover:bg-gold-light hover:text-charcoal hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center gap-2">
          🔍 Find a Project
        </a>
        <button onClick={() => window.dispatchEvent(new CustomEvent("stembridge:openUpload",{detail:"upload"}))}
          className="bg-white/8 text-white px-8 py-3 rounded-xl font-semibold text-sm border border-white/25 cursor-pointer font-sans
            hover:bg-white/16 hover:border-white/40 transition-all">
          ⬆ Upload My Project
        </button>
      </div>
    </section>
  );
}
