"use client";
import { useState } from "react";

export default function Sustain() {
  const [activeTab, setActiveTab] = useState(0);

  const platform = [
    {
      title: "Wanted Ads",
      desc: 'Post targeted skill requests so exactly the right student can find you.',
      ex: '"Need: Python dev, 3 hrs/wk, MESA welcome"',
      color: "bg-green-DEFAULT",
    },
    {
      title: "Direct Reach-Out",
      desc: "Students send a short intro message to project leads directly. No hunting for emails.",
      ex: '"Hi, I\'m a CS 1C student interested in joining..."',
      color: "bg-green-mid",
    },
    {
      title: "Updates + Prototypes",
      desc: "Project leads post updates \u2014 including mockup screenshots and milestone notes.",
      ex: '"v0.2 prototype: see attached screenshot"',
      color: "bg-green-light",
    },
    {
      title: "30-Day Ping",
      desc: "Automated script checks project activity and sends a reminder if nothing updated in 30 days.",
      ex: "Already built and running",
      color: "bg-brand_red",
    },
    {
      title: "Living Archive",
      desc: "Projects are never deleted \u2014 archived. The next generation picks up with full documentation.",
      ex: "Automatically archived, always searchable",
      color: "bg-gold-DEFAULT",
    },
    {
      title: "Profile Recognition",
      desc: "Every contribution shows on your student profile \u2014 visible to transfer universities and employers.",
      ex: '"Contributed to: 3 projects | 2 completed"',
      color: "bg-green-DEFAULT",
    },
  ];

  const persistence = [
    {
      title: "Structured Onboarding",
      desc: "Every project includes a starter brief: the problem, first 3 tasks, and what a new contributor can do in week one.",
      model: "Inspired by open-source contributor guides",
      num: "01",
    },
    {
      title: "Mentorship Pairing",
      desc: "Experienced students or faculty mentors are paired with project teams. A working professional or advanced student checks in weekly.",
      model: "Modeled after Braven cohort coaching",
      num: "02",
    },
    {
      title: "Role-Based Briefs",
      desc: "Each project defines clear roles (developer, designer, researcher, writer) with specific deliverables and time expectations.",
      model: "Adapted from hackathon team structures",
      num: "03",
    },
    {
      title: "Milestone Recognition",
      desc: "Public recognition at key milestones \u2014 first commit, first prototype, project completion. Badges visible on student profiles.",
      model: "Inspired by hackathon prizes & portfolio building",
      num: "04",
    },
    {
      title: "Documentation Culture",
      desc: "Every project maintains a living doc: decisions made, lessons learned, handoff notes. The next contributor picks up without starting from zero.",
      model: "Prevents the graveyard effect",
      num: "05",
    },
    {
      title: "Quarterly Showcases",
      desc: "End-of-quarter demos where teams present progress to peers, faculty, and industry partners.",
      model: "Combines hackathon energy with academic cadence",
      num: "06",
    },
  ];

  return (
    <section className="py-24 px-[5vw] bg-white overflow-hidden">
      {/* ── Section 1: Platform Mechanisms — Interactive Tabs ── */}
      <div className="reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">
          Built-in supports
        </p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">
          How StemBridge keeps projects alive.
        </h2>
        <p className="text-muted text-sm max-w-[560px] leading-loose mb-8">
          Six platform mechanisms that sustain participation rather than letting it fade.
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 reveal">
        {/* Tab buttons */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {platform.map((it, i) => (
            <button
              key={it.title}
              onClick={() => setActiveTab(i)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-sans font-semibold transition-all duration-200
                flex-shrink-0 border cursor-pointer
                ${activeTab === i
                  ? "bg-green-DEFAULT text-white border-green-DEFAULT shadow-lg"
                  : "bg-cream text-charcoal border-sand hover:border-green-DEFAULT/30 hover:bg-green-pale"
                }`}
            >
              <span className="text-[0.65rem] font-bold tracking-widest uppercase opacity-60 block mb-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              {it.title}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div className="relative min-h-[260px]">
          {platform.map((it, i) => (
            <div
              key={it.title}
              className={`absolute inset-0 transition-all duration-300
                ${activeTab === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            >
              <div className="h-full rounded-2xl border border-green-DEFAULT/10 bg-gradient-to-br from-green-pale via-white to-cream p-8 lg:p-10 flex flex-col justify-center">
                <div className={`w-12 h-12 rounded-xl ${it.color} flex items-center justify-center text-white font-display font-bold text-lg mb-5`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-bold text-[clamp(1.4rem,2.2vw,1.8rem)] text-green-DEFAULT mb-3">
                  {it.title}
                </h3>
                <p className="text-muted text-[0.92rem] leading-relaxed max-w-[520px] mb-4">
                  {it.desc}
                </p>
                <div className="inline-flex items-center gap-2 bg-green-DEFAULT/8 rounded-lg px-4 py-2.5 max-w-fit">
                  <span className="text-[0.7rem] font-bold text-green-DEFAULT tracking-wide uppercase">Example</span>
                  <span className="text-[0.82rem] text-green-mid font-mono">{it.ex}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 2: Persistence Framework — Bold numbered blocks ── */}
      <div className="mt-24 reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">
          Beyond the platform
        </p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">
          What makes teams persist, not just start.
        </h2>
        <p className="text-muted text-sm max-w-[620px] leading-loose">
          The hardest problem isn&apos;t getting students to join &mdash; it&apos;s keeping them engaged.
          These structures draw from Braven&apos;s mentorship model, hackathon incentive design,
          and open-source community best practices.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {persistence.map((it, i) => (
          <div
            key={it.title}
            className={`group grid md:grid-cols-[80px_1fr_220px] items-center gap-4 md:gap-6
              rounded-2xl border border-green-DEFAULT/8 bg-cream hover:bg-green-pale
              hover:border-green-DEFAULT/20 transition-all duration-300 px-6 py-5
              reveal reveal-delay-${(i % 3) + 1}`}
          >
            {/* Number */}
            <div className="font-display font-black text-[2.8rem] text-green-DEFAULT/15 group-hover:text-green-DEFAULT/30 transition-colors leading-none">
              {it.num}
            </div>

            {/* Content */}
            <div>
              <h3 className="font-bold text-[0.95rem] text-charcoal mb-1">{it.title}</h3>
              <p className="text-[0.82rem] text-muted leading-relaxed">{it.desc}</p>
            </div>

            {/* Model tag */}
            <div className="md:text-right">
              <span className="inline-flex items-center gap-1.5 bg-gold-pale border border-gold-DEFAULT/15 rounded-full px-3 py-1.5 text-[0.68rem] font-medium text-gold-DEFAULT">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-DEFAULT" />
                {it.model}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Research Question — Full-width accent block ── */}
      <div className="mt-16 relative reveal">
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #003b5c 0%, #002640 100%)" }}>
          <div className="absolute w-[400px] h-[400px] rounded-full top-[-150px] right-[-100px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,150,43,.12) 0%, transparent 60%)" }} />
          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 grid md:grid-cols-[1fr_300px] gap-8 items-center">
            <div>
              <p className="text-[0.7rem] font-bold tracking-widest uppercase text-gold-light mb-3">
                Driving Research Question
              </p>
              <p className="text-[1.05rem] md:text-[1.15rem] text-white/90 leading-relaxed font-display font-light italic">
                &ldquo;What conditions, environments, resources, and incentives are needed so that once open
                projects are featured &mdash; with defined roles across functions &mdash; participation is sustained
                rather than short-lived?&rdquo;
              </p>
            </div>
            <div className="bg-white/8 border border-white/12 rounded-xl px-5 py-4">
              <p className="text-[0.72rem] font-bold text-gold-light uppercase tracking-wide mb-2">Models We Study</p>
              <ul className="space-y-2">
                {[
                  ["Braven", "Structured cohorts + leadership coaches"],
                  ["Hackathons", "Prizes, industry exposure, portfolios"],
                  ["Open Source", "Clear contribution paths + mentorship"],
                ].map(([name, detail]) => (
                  <li key={name} className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-light mt-1.5 flex-shrink-0" />
                    <span className="text-[0.78rem] text-white/75">
                      <span className="font-bold text-white/90">{name}</span> &mdash; {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
