// components/Hero.jsx — CLIENT component (dispatches custom events)
"use client";
export default function Hero() {
  return (
    <section className="min-h-screen pt-[calc(68px+72px)] pb-20 px-[5vw] grid md:grid-cols-[1.05fr_0.95fr] gap-16 items-center
      relative overflow-hidden bg-cream">
      {/* Decorative background blobs */}
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none
        right-[-100px] top-[-100px] animate-[float1_8s_ease-in-out_infinite]"
        style={{background:"radial-gradient(circle, rgba(46,134,193,.12) 0%, transparent 70%)"}} />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none
        left-[-80px] bottom-[80px] animate-[float2_10s_ease-in-out_infinite]"
        style={{background:"radial-gradient(circle, rgba(201,150,43,.08) 0%, transparent 70%)"}} />

      {/* Left — headline + CTA */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-green-DEFAULT/8 text-green-DEFAULT
          px-3 py-1.5 rounded-full text-[0.7rem] font-bold tracking-widest uppercase mb-5
          border border-green-DEFAULT/12">
          <span className="w-2 h-2 rounded-full bg-green-light animate-pulse" />
          Where Foothill STEM Students Build Together
        </div>

        <h1 className="font-display font-black text-[clamp(3rem,5.5vw,4.8rem)] leading-[0.97]
          text-green-DEFAULT tracking-tight mb-5">
          Stem<span className="text-gold-DEFAULT">Bridge</span>
          <em className="block font-display font-light italic text-gold-DEFAULT text-[0.85em] mt-1">
            connect · build · launch
          </em>
        </h1>

        <p className="text-muted text-base max-w-[480px] mb-8 leading-[1.8]">
          Upload your project. Post a wanted ad for skills you need. Find a project that fits
          your life. Cross-pollinate across CS, science, art, business, and social justice —
          no cold emails, no secret clubs.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a href="#search-anchor"
            className="bg-green-DEFAULT text-white px-7 py-3 rounded-xl text-sm font-bold no-underline
              transition-all duration-200 hover:bg-green-mid hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2">
            🔍 Find a Project
          </a>
          <button
            className="bg-transparent text-green-DEFAULT border-2 border-green-DEFAULT px-7 py-3
              rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:bg-green-DEFAULT hover:text-white font-sans"
            onClick={() => {
              // The upload modal lives in Nav — dispatch a custom event
              window.dispatchEvent(new CustomEvent("stembridge:openUpload", { detail: "upload" }));
            }}>
            ⬆ Upload Yours
          </button>
        </div>

        {/* Funding attribution */}
        <div className="flex items-center gap-3 mb-8 bg-gold-pale border border-gold-DEFAULT/20 rounded-xl px-4 py-3 max-w-fit">
          <span className="text-[0.72rem] text-muted leading-snug">
            Funded by{" "}
            <a href="https://foothill.edu/sli/" target="_blank" rel="noopener noreferrer"
              className="font-bold text-green-DEFAULT no-underline hover:underline">SLI</a>
            {" & "}
            <span className="font-bold text-green-DEFAULT">MESA</span>
            {" "}at Foothill College
          </span>
        </div>

        {/* Stats */}
        <div className="flex gap-10 pt-8 border-t border-green-DEFAULT/12">
          {[["150+","Active Projects"],["500+","Students Connected"],["3","Learning Communities"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display font-black text-[2.1rem] text-green-DEFAULT leading-none tracking-tight">{n}</div>
              <div className="text-[0.72rem] text-muted font-medium mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — floating project preview cards (hidden on mobile) */}
      <div className="hidden md:flex flex-col gap-3 relative z-10">
        {[
          { icon:"🤖", bg:"#f0e8d5", title:"Student-Project Matching Engine",   tag:"In Progress!", tagClass:"bg-blue-100 text-blue-700",  badge:"CS/Tech",  badgeClass:"bg-blue-100 text-blue-800" },
          { icon:"📣", bg:"#fde8e6", title:"WANTED: UX Designer for resume tool", tag:"Wanted Ad",   tagClass:"bg-red-100 text-red-700",   badge:"Flexible", badgeClass:"bg-gray-100 text-gray-600" },
          { icon:"🌱", bg:"#e8f4ee", title:"Campus Sustainability Tracker",       tag:"Recruiting!",  tagClass:"bg-yellow-100 text-yellow-700", badge:"Science", badgeClass:"bg-red-100 text-red-800" },
          { icon:"📊", bg:"#fef4e0", title:"Food Insecurity Dashboard",           tag:"Completed!",  tagClass:"bg-emerald-100 text-emerald-700", badge:"Social Justice", badgeClass:"bg-green-100 text-green-800" },
        ].map((p, i) => (
          <div key={p.title}
            style={{ marginLeft: [0, 32, 12, 44][i], animationDelay: `${(i+1)*0.12}s` }}
            className="bg-white rounded-2xl px-4 py-3.5 shadow-md flex gap-3 items-start
              border border-green-DEFAULT/6 cursor-default
              transition-all duration-300 hover:translate-x-2 hover:shadow-xl
              opacity-0 animate-[slideIn_0.6s_ease-out_both]">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
              style={{background: p.bg}}>{p.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[0.82rem] text-charcoal truncate">{p.title}</div>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                <span className={`status-tag ${p.tagClass}`}>{p.tag}</span>
                <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${p.badgeClass}`}>{p.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Keyframe styles injected inline for the floating cards */}
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(32px) } to { opacity:1; transform:translateX(0) } }
        @keyframes float1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }
        @keyframes float2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-15px)} }
      `}</style>
    </section>
  );
}
