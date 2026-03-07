"use client";
import { useState } from "react";
const TABS = [
  { key:"programs", label:"Campus Programs", items:[
    { icon:"🔬", title:"Science Learning Institute (SLI)", desc:'Spring internship program — competitive, limited spots. StemBridge is the "Plan B" for students who don\'t get in.' },
    { icon:"🚀", title:"ETI", desc:"2–3 year hands-on learning. Karl's vision: simple frameworks to help students go from idea to action." },
    { icon:"💡", title:"KCI Innovation Challenge", desc:"Campus innovation competition — great for teams that want a structured goal and recognition." },
    { icon:"🤝", title:"Enactus", desc:"Student org using entrepreneurial action to make social impact." },
    { icon:"🌱", title:"MESA", desc:"Math, Engineering, Science Achievement — supports first-gen, low-income STEM students." },
    { icon:"🌍", title:"Puente & Umoja", desc:"Learning communities supporting Latinx and African American students." },
  ]},
  { key:"frameworks", label:"Project Frameworks", items:[
    { icon:"🗺️", title:"Project Brief Template", desc:"A 1-page template: problem, skills needed, time commitment, and the first 3 tasks for a new collaborator." },
    { icon:"🧩", title:"Design Thinking Starter Kit", desc:"Empathize → Define → Ideate → Prototype → Test, simplified into a 5-step worksheet." },
    { icon:"🤖", title:"Intro to ML (Cris's Notes)", desc:"Student-written guide to ML concepts powering StemBridge's matching system." },
    { icon:"🐍", title:"Python for Non-CS Students", desc:"Short videos and a starter notebook for any major." },
  ]},
  { key:"equity", label:"Equity Pathways", items:[
    { icon:"📋", title:"Dream Act Students & Projects", desc:"If federal work study limits off-campus internships, campus projects are a verified alternative." },
    { icon:"🌐", title:"International Student Pathways", desc:"Projects that don't require work authorization but build portfolio evidence." },
    { icon:"💼", title:"What Employers Actually Want", desc:"Sophia's industry partner conversations — the specific skills missing from most student resumes." },
  ]},
];
export default function Resources() {
  const [active, setActive] = useState("programs");
  const tab = TABS.find(t => t.key === active);
  return (
    <section id="resources" className="py-20 px-[5vw] bg-cream">
      <div className="reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">Campus Resources</p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">Everything in one place.</h2>
        <p className="text-muted text-sm max-w-[560px] leading-loose">One of the biggest barriers is not knowing what already exists.</p>
      </div>
      <div className="flex border-b-2 border-sand mt-8 gap-1">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActive(t.key)}
            className={`bg-none border-none pb-3 px-5 text-sm font-medium cursor-pointer
              border-b-[3px] -mb-[2px] transition-all font-sans rounded-t-lg
              ${active===t.key ? "border-green-DEFAULT text-green-DEFAULT font-bold bg-green-pale" : "border-transparent text-muted hover:text-green-DEFAULT"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tab?.items.map(it => (
          <div key={it.title} className="bg-white rounded-2xl p-5 border border-green-DEFAULT/9 hover:-translate-y-0.5 hover:shadow-md hover:border-green-DEFAULT/20 transition-all duration-200">
            <span className="text-[1.35rem] mb-2 block">{it.icon}</span>
            <h4 className="font-bold text-sm text-charcoal mb-1">{it.title}</h4>
            <p className="text-[0.78rem] text-muted leading-relaxed">{it.desc}</p>
            <a href="#" className="inline-block mt-2 text-xs font-bold text-green-DEFAULT no-underline hover:underline">Learn more →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
