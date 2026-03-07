export default function Sustain() {
  const platform = [
    { icon:"📣", title:"Wanted Ads", desc:'Post targeted skill requests so exactly the right student can find you.', ex:'→ "Need: Python dev, 3 hrs/wk, MESA welcome"' },
    { icon:"💬", title:"Direct Reach-Out", desc:"Students send a short intro message to project leads directly. No hunting for emails.", ex:'→ "Hi, I\'m a CS 1C student interested in joining…"' },
    { icon:"📸", title:"Updates + Prototypes", desc:"Project leads post updates — including mockup screenshots and milestone notes.", ex:'→ "v0.2 prototype: see attached screenshot"' },
    { icon:"🔔", title:"30-Day Ping", desc:"Automated script checks project activity and sends a reminder if nothing updated in 30 days.", ex:"→ Task 4: Already built and running" },
    { icon:"🗂️", title:"Living Archive", desc:"Projects are never deleted — archived. The next generation picks up with full documentation.", ex:"→ Automatically archived, always searchable" },
    { icon:"🏅", title:"Profile Recognition", desc:"Every contribution shows on your student profile — visible to transfer universities and employers.", ex:'→ "Contributed to: 3 projects | 2 completed"' },
  ];

  const persistence = [
    { icon:"🗺️", title:"Structured Onboarding", desc:"Every project includes a starter brief: the problem, first 3 tasks, and what a new contributor can do in week one. No more showing up and not knowing what to do.", model:"Inspired by open-source contributor guides" },
    { icon:"🤝", title:"Mentorship Pairing", desc:"Experienced students or faculty mentors are paired with project teams. Like Braven's leadership coach model — a working professional or advanced student who checks in weekly.", model:"Modeled after Braven cohort coaching" },
    { icon:"📋", title:"Role-Based Briefs", desc:"Each project defines clear roles (developer, designer, researcher, writer) with specific deliverables and time expectations. Students know exactly what they're committing to.", model:"Adapted from hackathon team structures" },
    { icon:"🏆", title:"Milestone Recognition", desc:"Public recognition at key milestones — first commit, first prototype, project completion. Badges visible on student profiles and shareable for resumes and transfer apps.", model:"Inspired by hackathon prizes & portfolio building" },
    { icon:"📝", title:"Documentation Culture", desc:"Every project maintains a living doc: decisions made, lessons learned, handoff notes. When a student graduates, the next contributor picks up without starting from zero.", model:"Prevents the graveyard effect" },
    { icon:"🔄", title:"Quarterly Showcases", desc:"End-of-quarter demos where teams present progress to peers, faculty, and industry partners. Creates accountability, visibility, and a natural rhythm for sustained engagement.", model:"Combines hackathon energy with academic cadence" },
  ];

  return (
    <section className="py-20 px-[5vw] bg-white">
      {/* Platform mechanisms */}
      <div className="reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">Built-in supports</p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">How StemBridge keeps projects alive.</h2>
        <p className="text-muted text-sm max-w-[560px] leading-loose">Six platform mechanisms that sustain participation rather than letting it fade.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {platform.map((it,i) => (
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

      {/* Persistence & sustainability framework */}
      <div className="mt-16 reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">Beyond the platform</p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">What makes teams persist, not just start.</h2>
        <p className="text-muted text-sm max-w-[620px] leading-loose">
          The hardest problem isn&apos;t getting students to join — it&apos;s keeping them engaged.
          These structures draw from Braven&apos;s mentorship model, hackathon incentive design,
          and open-source community best practices.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {persistence.map((it,i) => (
          <div key={it.title} className={`rounded-2xl p-6 bg-green-pale/50 border border-green-DEFAULT/10
            hover:border-green-DEFAULT/25 hover:-translate-y-1 hover:shadow-md
            hover:bg-green-pale transition-all duration-200 reveal reveal-delay-${(i%3)+1}`}>
            <span className="text-[1.6rem] mb-3 block">{it.icon}</span>
            <h3 className="font-bold text-sm text-charcoal mb-1">{it.title}</h3>
            <p className="text-[0.78rem] text-muted leading-relaxed">{it.desc}</p>
            <p className="mt-2 pt-2 border-t border-green-DEFAULT/10 text-[0.68rem] text-green-DEFAULT font-medium italic">{it.model}</p>
          </div>
        ))}
      </div>

      {/* Research question callout */}
      <div className="mt-10 bg-gold-pale border border-gold-DEFAULT/15 rounded-2xl px-7 py-6 max-w-[760px] reveal">
        <p className="text-[0.7rem] font-bold tracking-widest uppercase text-gold-DEFAULT mb-2">Research Question</p>
        <p className="text-[0.88rem] text-charcoal leading-loose font-display font-light italic">
          &ldquo;What conditions, environments, resources, and incentives are needed so that once open
          projects are featured — with defined roles across functions — participation is sustained
          rather than short-lived?&rdquo;
        </p>
        <p className="text-[0.75rem] text-muted mt-3 leading-relaxed">
          This is the core question driving StemBridge&apos;s design. We&apos;re actively researching models
          like Braven (structured cohorts with leadership coaches), hackathons (prizes, industry exposure,
          portfolio building), and open-source communities (clear contribution paths, maintainer mentorship).
          More findings coming soon.
        </p>
      </div>
    </section>
  );
}
