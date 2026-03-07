// components/MatchQuiz.jsx — CLIENT component (quiz state)
"use client";
import { useState } from "react";
import { AREA_META, STATUS_META } from "@/lib/projects";

const Q = [
  { q:"What's your primary area of interest?", opts:[["cs","💻 Computer Science / Tech"],["social","🌍 Social Justice / Community"],["art","🎨 Art / Design / Media"],["science","🔬 Science / Engineering"],["business","📈 Business / Entrepreneurship"],["other","🤷 Not sure yet"]] },
  { q:"What's your experience level?", opts:[["beginner","🌱 Complete beginner — here to learn"],["some","📚 Some skills — took a few classes"],["solid","⚙️ Solid — I've built things before"],["lead","🚀 Ready to lead a project"]] },
  { q:"How much time can you realistically give?", opts:[["low","⏱ 1–2 hrs/week — really busy"],["mid","🕐 3–5 hrs/week — steady"],["high","🔥 6+ hrs/week — all in"]] },
];

export default function MatchQuiz({ projects }) {
  const [step,    setStep]    = useState(0); // 0=q1, 1=q2, 2=q3, 3=results
  const [answers, setAnswers] = useState({});

  const pick = (val) => {
    const qa = { ...answers, [step]: val };
    setAnswers(qa);
    setTimeout(() => setStep(s => s + 1), 320);
  };

  const results = () => {
    const [area, lv, time] = [answers[0], answers[1], answers[2]];
    return projects
      .filter(p => p.status !== "done" && p.status !== "wanted")
      .map(p => {
        let s = 0;
        if (p.area === area || area === "other") s += 3;
        if (time === "low"  && p.time_commitment?.includes("2")) s += 2;
        if (time === "mid"  && p.time_commitment?.includes("3")) s += 2;
        if (time === "high") s += 1;
        if (lv === "beginner" && p.experience_level === "beginner") s += 2;
        if (lv === "some"     && ["beginner","some"].includes(p.experience_level)) s += 2;
        if (lv === "solid"    && p.experience_level === "solid") s += 2;
        return { ...p, score: s };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const reset = () => { setStep(0); setAnswers({}); };
  const pct = Math.round((step / 3) * 100);

  return (
    <section id="match" className="py-20 px-[5vw] bg-warm-white">
      <div className="reveal">
        <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-DEFAULT mb-1 flex items-center gap-2 before:content-[''] before:w-4 before:h-[1.5px] before:bg-gold-DEFAULT">Smart Matching</p>
        <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.8rem)] text-green-DEFAULT tracking-tight mb-2">Find your project in 3 questions.</h2>
        <p className="text-muted text-sm max-w-[560px] leading-loose">No scrolling. Answer three quick questions and StemBridge surfaces your top matches.</p>
      </div>
      <div className="max-w-[660px] bg-white rounded-2xl p-9 shadow-md border border-green-DEFAULT/8 mt-8 reveal">
        {/* Progress bar */}
        <div className="h-1 bg-sand rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-light to-green-DEFAULT rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }} />
        </div>
        <p className="text-[0.7rem] font-bold font-mono text-muted mb-4 tracking-widest uppercase">
          {step < 3 ? `Step ${step + 1} of 3` : "Here are your matches!"}
        </p>

        {step < 3 ? (
          <div key={step} className="animate-[fadeUp_.35s_ease-out]">
            <h3 className="text-[1.1rem] font-semibold text-charcoal mb-4 leading-snug">{Q[step].q}</h3>
            <div className="grid grid-cols-2 gap-3">
              {Q[step].opts.map(([val, label]) => (
                <button key={val} onClick={() => pick(val)}
                  className={`bg-cream border-2 border-transparent rounded-xl px-4 py-3 cursor-pointer text-left
                    text-sm font-medium text-charcoal font-sans transition-all duration-200
                    hover:border-green-light hover:bg-green-pale hover:-translate-y-0.5
                    ${answers[step] === val ? "border-green-DEFAULT bg-green-pale text-green-DEFAULT font-semibold" : ""}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-[fadeUp_.4s_ease-out]">
            <h3 className="text-base font-bold text-green-DEFAULT mb-3">🎯 Your Top Matches</h3>
            <div className="flex flex-col gap-3">
              {results().map(p => {
                const a = AREA_META[p.area] || AREA_META.other;
                const s = STATUS_META[p.status] || STATUS_META.idea;
                return (
                  <div key={p.id} className="bg-cream rounded-2xl p-4 border-l-4 border-green-light hover:bg-sand transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl">{p.icon}</span>
                      <span className="font-semibold text-sm text-charcoal">{p.title}</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      <span className={`status-tag ${s.pillClass}`}>{s.label}</span>
                      <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${a.classes}`}>{a.label}</span>
                      <span className="font-mono text-[0.65rem] bg-sand text-muted px-1.5 py-0.5 rounded">{p.time_commitment}</span>
                    </div>
                    <p className="font-mono text-[0.68rem] text-green-DEFAULT font-semibold mt-1.5">✓ Matched on your interests + availability</p>
                  </div>
                );
              })}
            </div>
            <button onClick={reset} className="mt-4 border border-green-DEFAULT/20 text-muted bg-none rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer font-sans hover:border-green-DEFAULT hover:text-green-DEFAULT transition-all">↺ Start over</button>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
