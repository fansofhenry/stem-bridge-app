// components/ThreePaths.jsx — CLIENT component (dispatches custom events)
"use client";
export default function ThreePaths() {
  const paths = [
    {
      color: "bg-green-DEFAULT text-white",
      ctaColor: "bg-white text-green-DEFAULT hover:bg-gold-light",
      icon: "🔍", title: "Find a Project to Join",
      desc: "Search by discipline, keyword, skill, or time. Use the 3-question Match Quiz for instant recommendations.",
      steps: ["Search or use Match Quiz","See full brief, updates & mockups","Reach out to the project lead"],
      cta: "Browse Projects →", href: "#search-anchor",
    },
    {
      color: "bg-white border-2 border-green-DEFAULT",
      ctaColor: "bg-green-DEFAULT text-white hover:bg-green-mid",
      icon: "⬆", title: "Upload a Project You're Working On",
      desc: "Post your brief, set your status, and post progress updates as you build.",
      steps: ["Fill out your project brief","Go live — students discover you","Post updates to keep momentum"],
      cta: "⬆ Upload Project", action: "upload",
    },
    {
      color: "bg-brand_red text-white",
      ctaColor: "bg-white text-brand_red hover:bg-red-50",
      icon: "📣", title: "Post a Wanted Ad for Skills",
      desc: "Need a Python dev? A graphic designer? Post a targeted ad and let the right person find you.",
      steps: ["Describe the exact skill you need","Set the time ask & commitment","Interested students reach out"],
      cta: "📣 Post Wanted Ad", action: "wanted",
    },
  ];

  return (
    <section className="py-20 px-[5vw] bg-warm-white">
      <div className="text-center reveal">
        <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-2
          flex items-center justify-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT
          after:content-[''] after:w-4 after:h-[1.5px] after:bg-gold-DEFAULT">
          Three ways in. One community out.
        </div>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">
          Your move.
        </h2>
        <p className="text-muted text-sm max-w-[560px] mx-auto leading-loose">
          Whether you&apos;re leading, joining, or hunting for a specific skill — StemBridge has a path.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {paths.map((p, i) => (
          <div key={p.title}
            className={`rounded-2xl p-8 flex flex-col gap-3 cursor-pointer transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl reveal reveal-delay-${i+1} ${p.color}`}>
            <span className="text-[2.2rem]">{p.icon}</span>
            <h3 className="font-display font-bold text-xl leading-snug">{p.title}</h3>
            <p className="text-[0.83rem] leading-loose opacity-80 flex-1">{p.desc}</p>
            <ol className="flex flex-col gap-1.5">
              {p.steps.map((s, j) => (
                <li key={s} className="flex gap-2 items-start text-[0.78rem] opacity-80">
                  <span className="w-[18px] h-[18px] rounded-full bg-white/20 flex items-center justify-center
                    text-[0.6rem] font-bold flex-shrink-0 mt-0.5">{j+1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <a href={p.href || "#"}
              onClick={p.action ? (e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("stembridge:openUpload", { detail: p.action }));
              } : undefined}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold
                transition-all duration-200 w-fit no-underline mt-1 ${p.ctaColor}`}>
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
