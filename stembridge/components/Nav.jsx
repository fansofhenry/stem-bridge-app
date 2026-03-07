// components/Nav.jsx  — CLIENT component (needs useState for mobile menu)
"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [uploadOpen,  setUploadOpen]  = useState(false);
  const [uploadMode,  setUploadMode]  = useState("upload"); // "upload" | "wanted"

  // Shadow nav after scrolling 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openUpload = (mode) => {
    setUploadMode(mode);
    setUploadOpen(true);
    setMenuOpen(false);
  };

  // Listen for custom upload events dispatched by Hero, ThreePaths, CtaBanner
  useEffect(() => {
    const onOpenUpload = (e) => openUpload(e.detail || "upload");
    window.addEventListener("stembridge:openUpload", onOpenUpload);
    return () => window.removeEventListener("stembridge:openUpload", onOpenUpload);
  }, []);

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between
          px-[5vw] gap-4 bg-[#faf7f0]/95 backdrop-blur-md border-b border-green-DEFAULT/10
          transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        {/* Logo */}
        <a href="#" className="flex flex-col no-underline flex-shrink-0">
          <span className="font-display font-bold text-xl text-green-DEFAULT tracking-tight leading-none">
            Stem<span className="text-gold-DEFAULT">Bridge</span>
          </span>
          <span className="text-[0.6rem] text-muted font-medium tracking-widest uppercase">
            Foothill College · STEM Collaboration
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 list-none text-sm font-medium">
          {[["#search-anchor","Browse"],["#match","Find My Match"],["#crosspoll","Collaborate"],["#resources","Resources"]].map(([href, label]) => (
            <li key={href}>
              <a href={href}
                className="text-muted hover:text-green-DEFAULT transition-colors duration-200 no-underline
                  relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-full
                  after:h-[1.5px] after:bg-gold-DEFAULT hover:after:right-0 after:transition-all after:duration-300">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop action buttons */}
        <div className="hidden md:flex gap-2 flex-shrink-0">
          <button onClick={() => document.getElementById("search-anchor")?.scrollIntoView({behavior:"smooth"})}
            className="px-4 py-[0.42rem] rounded-lg text-xs font-bold border-[1.5px] border-green-DEFAULT text-green-DEFAULT
              hover:bg-green-DEFAULT hover:text-white transition-all duration-200 cursor-pointer bg-transparent">
            🔍 Browse
          </button>
          <button onClick={() => openUpload("wanted")}
            className="px-4 py-[0.42rem] rounded-lg text-xs font-bold bg-brand_red text-white hover:bg-[#a93226] transition-all duration-200 cursor-pointer border-none">
            📣 Wanted Ad
          </button>
          <button onClick={() => openUpload("upload")}
            className="px-4 py-[0.42rem] rounded-lg text-xs font-bold bg-green-DEFAULT text-white hover:bg-green-mid transition-all duration-200 cursor-pointer border-none">
            ⬆ Upload Project
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-[6px] rounded-lg hover:bg-sand transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`block w-[22px] h-[2px] bg-green-DEFAULT rounded transition-all duration-300 origin-center
            ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-[22px] h-[2px] bg-green-DEFAULT rounded transition-all duration-300
            ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-[22px] h-[2px] bg-green-DEFAULT rounded transition-all duration-300 origin-center
            ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="fixed top-[68px] left-0 right-0 z-40 bg-cream border-b border-sand shadow-xl
          flex flex-col gap-0 px-[5vw] py-6">
          {[["#search-anchor","🔍 Browse Projects"],["#match","🎯 Find My Match"],["#crosspoll","🔬 Collaborate"],["#resources","📚 Resources"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-green-DEFAULT/10 text-[0.92rem] font-semibold text-charcoal no-underline">
              {label}
            </a>
          ))}
          <div className="flex gap-2 mt-4">
            <button onClick={() => openUpload("upload")}
              className="flex-1 py-2 rounded-lg text-sm font-bold bg-green-DEFAULT text-white border-none cursor-pointer">
              ⬆ Upload Project
            </button>
            <button onClick={() => openUpload("wanted")}
              className="flex-1 py-2 rounded-lg text-sm font-bold bg-brand_red text-white border-none cursor-pointer">
              📣 Wanted Ad
            </button>
          </div>
        </div>
      )}

      {/* ── Upload / Wanted modal — rendered here so it's always available ── */}
      {uploadOpen && (
        <UploadModal mode={uploadMode} onClose={() => setUploadOpen(false)} onSwitchMode={setUploadMode} />
      )}
    </>
  );
}

// ── Inline upload modal (kept in Nav so it's accessible from any button) ──
function UploadModal({ mode, onClose, onSwitchMode }) {
  const [fields,  setFields]  = useState({});
  const [skills,  setSkills]  = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");
  const [status,  setStatus]  = useState("");

  const set = (k, v) => setFields(f => ({ ...f, [k]: v }));

  const addSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const val = skillInput.trim().replace(/,$/, "");
      if (!skills.includes(val)) setSkills(s => [...s, val]);
      setSkillInput("");
    }
  };

  const submit = async () => {
    const isWanted = mode === "wanted";
    const required = isWanted
      ? ["w_role","w_desc","w_area","w_time","w_name","w_email"]
      : ["u_title","u_desc","u_area","u_time","u_name","u_email"];
    const missing = required.filter(k => !fields[k]);
    if (missing.length || (!isWanted && !status)) {
      setError("Please fill in all required fields."); return;
    }
    setLoading(true); setError("");
    try {
      const body = isWanted ? {
        icon: "📣", bg_color: "#fde8e6",
        title: `WANTED: ${fields.w_role}`,
        description: fields.w_desc.slice(0, 170),
        long_desc:   fields.w_desc,
        status: "wanted", area: fields.w_area,
        time_commitment: fields.w_time, skills,
        lead_name: fields.w_name, lead_email: fields.w_email,
        wanted_role: fields.w_role,
      } : {
        title: fields.u_title,
        description: fields.u_desc.slice(0, 170),
        long_desc:   fields.u_desc,
        status, area: fields.u_area,
        time_commitment: fields.u_time, skills,
        lead_name: fields.u_name, lead_email: fields.u_email,
        community: fields.u_comm || "General",
      };
      const res = await fetch("/api/projects", { method: "POST",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error((await res.json()).error);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[400] flex items-center justify-center p-6"
      role="dialog" aria-modal="true" aria-label={mode === "wanted" ? "Post a Wanted Ad" : "Upload Your Project"}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl p-9 max-w-[640px] w-full max-h-[92vh] overflow-y-auto relative">
        <button onClick={onClose} aria-label="Close dialog"
          className="absolute top-4 right-4 bg-sand border-none rounded-lg w-8 h-8 cursor-pointer
            text-muted flex items-center justify-center hover:bg-charcoal hover:text-white transition-all">
          ✕
        </button>

        {success ? (
          <div className="text-center py-7">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-display text-2xl text-green-DEFAULT mb-2">You&apos;re live on StemBridge!</h3>
            <p className="text-muted text-sm">Other students can now find your project.</p>
            <button onClick={onClose} className="mt-5 bg-green-DEFAULT text-white px-6 py-2 rounded-lg font-bold border-none cursor-pointer">
              Back to Projects
            </button>
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            <div className="flex border-b-2 border-sand mb-6">
              {[["upload","⬆ Upload Project"],["wanted","📣 Post Wanted Ad"]].map(([m, label]) => (
                <button key={m} onClick={() => onSwitchMode(m)}
                  className={`bg-none border-none pb-3 px-5 font-sans text-sm font-medium cursor-pointer
                    border-b-[3px] -mb-[2px] transition-all rounded-t-lg
                    ${mode===m ? `font-bold border-b-[3px] ${m==="wanted"?"border-brand_red text-brand_red bg-red-50":"border-green-DEFAULT text-green-DEFAULT bg-green-pale"}` : "border-transparent text-muted hover:text-green-DEFAULT"}`}>
                  {label}
                </button>
              ))}
            </div>

            <h2 className={`font-display text-2xl font-bold mb-1 ${mode==="wanted" ? "text-brand_red" : "text-green-DEFAULT"}`}>
              {mode==="wanted" ? "📣 Post a Wanted Ad" : "⬆ Upload Your Project"}
            </h2>
            <p className="text-muted text-sm mb-6">Takes 2 minutes. Goes live immediately.</p>

            <div className="grid grid-cols-2 gap-3">
              {mode === "upload" ? (
                <>
                  <Field className="col-span-2" label="Project Title *" id="u_title" placeholder="e.g. Campus Sustainability Tracker" set={set} />
                  <Field className="col-span-2" label="What is your project about? *" id="u_desc" type="textarea" placeholder="Describe the problem and what collaborators will work on." set={set} />
                  <Select label="STEM Discipline *" id="u_area" set={set} options={[["cs","💻 CS / Tech"],["science","🔬 Science"],["social","🌍 Social Justice"],["art","🎨 Art / Design"],["business","📈 Business"],["other","🤷 Interdisciplinary"]]} />
                  <Select label="Time Commitment *" id="u_time" set={set} options={[["1–2 hrs/wk","1–2 hrs/wk"],["3–5 hrs/wk","3–5 hrs/wk"],["6+ hrs/wk","6+ hrs/wk"],["Flexible","Flexible"]]} />
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-charcoal mb-1">Project Status *</label>
                    <div className="flex gap-2 flex-wrap">
                      {[["idea","💡 Idea"],["collab","🤝 Looking for Collaborators"],["progress","⚡ In Progress"]].map(([s, label]) => (
                        <button key={s} type="button" onClick={() => setStatus(s)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-all font-sans
                            ${status===s ? "border-green-DEFAULT bg-green-pale text-green-DEFAULT font-bold" : "border-green-DEFAULT/20 bg-cream text-muted"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="Your Name *" id="u_name" placeholder="First name is fine" set={set} />
                  <Field label="Contact Email *" id="u_email" type="email" placeholder="your@email.com" set={set} />
                </>
              ) : (
                <>
                  <Field className="col-span-2" label="Skill or role needed? *" id="w_role" placeholder="e.g. Python Developer, UX Designer" set={set} />
                  <Field className="col-span-2" label="What will they work on? *" id="w_desc" type="textarea" placeholder="Give a clear picture of the project and what this role involves." set={set} />
                  <Select label="STEM Area *" id="w_area" set={set} options={[["cs","💻 CS / Tech"],["science","🔬 Science"],["social","🌍 Social Justice"],["art","🎨 Art / Design"],["business","📈 Business"],["other","Interdisciplinary"]]} />
                  <Select label="Time Ask *" id="w_time" set={set} options={[["1–2 hrs/wk","1–2 hrs/wk"],["3–5 hrs/wk","3–5 hrs/wk"],["6+ hrs/wk","6+ hrs/wk"],["Flexible","Flexible"]]} />
                  <Field label="Your Name *" id="w_name" placeholder="First name is fine" set={set} />
                  <Field label="Contact Email *" id="w_email" type="email" placeholder="your@email.com" set={set} />
                </>
              )}

              {/* Skill tags input */}
              <div className="col-span-2">
                <label className="block text-xs font-bold text-charcoal mb-1">Skills Needed <span className="font-normal text-muted">(press Enter after each)</span></label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-cream border-[1.5px] border-green-DEFAULT/15 rounded-xl min-h-[44px] items-center cursor-text"
                  onClick={(e) => e.currentTarget.querySelector("input")?.focus()}>
                  {skills.map(s => (
                    <span key={s} className="bg-green-DEFAULT/10 text-green-DEFAULT px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                      {s}<button type="button" onClick={() => setSkills(ss => ss.filter(x=>x!==s))} className="bg-none border-none cursor-pointer text-green-DEFAULT text-sm leading-none">×</button>
                    </span>
                  ))}
                  <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill}
                    placeholder="e.g. Python, Figma…"
                    className="border-none bg-transparent text-sm outline-none flex-1 min-w-[80px] font-sans" />
                </div>
              </div>
            </div>

            {error && <p className="mt-3 text-xs text-brand_red bg-red-50 border-l-4 border-brand_red px-3 py-2 rounded">{error}</p>}

            <div className="flex gap-3 justify-end mt-5">
              <button onClick={onClose} className="bg-sand border-none rounded-lg px-4 py-2 cursor-pointer text-sm text-muted font-sans">Cancel</button>
              <button onClick={submit} disabled={loading}
                className={`px-6 py-2 rounded-lg text-sm font-bold text-white border-none cursor-pointer transition-opacity
                  ${mode==="wanted" ? "bg-brand_red hover:bg-[#a93226]" : "bg-green-DEFAULT hover:bg-green-mid"}
                  ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>
                {loading ? "Posting…" : mode==="wanted" ? "📣 Post Wanted Ad" : "⬆ Post My Project"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Tiny reusable form field
function Field({ label, id, type="text", placeholder, set, className="" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-xs font-bold text-charcoal">{label}</label>
      {type === "textarea"
        ? <textarea id={id} placeholder={placeholder} rows={3} onChange={e => set(id, e.target.value)}
            className="font-sans text-sm bg-cream border-[1.5px] border-green-DEFAULT/15 rounded-xl px-3 py-2 outline-none resize-y transition-all focus:border-green-DEFAULT focus:bg-white" />
        : <input id={id} type={type} placeholder={placeholder} onChange={e => set(id, e.target.value)}
            className="font-sans text-sm bg-cream border-[1.5px] border-green-DEFAULT/15 rounded-xl px-3 py-2 outline-none transition-all focus:border-green-DEFAULT focus:bg-white" />
      }
    </div>
  );
}

function Select({ label, id, options, set }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-bold text-charcoal">{label}</label>
      <select id={id} onChange={e => set(id, e.target.value)}
        className="font-sans text-sm bg-cream border-[1.5px] border-green-DEFAULT/15 rounded-xl px-3 py-2 outline-none transition-all focus:border-green-DEFAULT focus:bg-white">
        <option value="">Select…</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
}
