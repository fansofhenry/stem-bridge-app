// components/ProjectModal.jsx — project detail overlay
"use client";
import { useEffect, useRef } from "react";
import { AREA_META, STATUS_META } from "@/lib/projects";

export default function ProjectModal({ project: p, onClose }) {
  const area   = AREA_META[p.area]    || AREA_META.other;
  const status = STATUS_META[p.status] || STATUS_META.idea;
  const isWanted = p.status === "wanted";

  const dialogRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // Focus the close button on open
    dialogRef.current?.querySelector("button")?.focus();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[300] flex items-center justify-center p-6"
      role="dialog" aria-modal="true" aria-label={p.title}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="bg-white rounded-2xl p-9 max-w-[600px] w-full max-h-[88vh] overflow-y-auto relative">
        <button onClick={onClose} aria-label="Close dialog"
          className="absolute top-4 right-4 bg-sand border-none rounded-lg w-8 h-8
            flex items-center justify-center cursor-pointer text-muted hover:bg-charcoal hover:text-white transition-all">
          ✕
        </button>

        <div className="text-3xl mb-2">{p.icon}</div>
        <h2 className="font-display font-bold text-2xl text-green-DEFAULT tracking-tight mb-1">{p.title}</h2>
        <div className="flex gap-2 flex-wrap mb-4">
          <span className={`status-tag ${status.pillClass}`}>{status.label}</span>
          <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${area.classes}`}>{area.label}</span>
          <span className="bg-sand text-muted text-[0.67rem] px-2 py-0.5 rounded">{p.community}</span>
          <span className="font-mono text-[0.65rem] bg-sand text-muted px-1.5 py-0.5 rounded">{p.time_commitment}</span>
        </div>

        <p className="text-muted text-sm leading-loose mb-4">{p.long_desc}</p>

        {isWanted && (
          <>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-1">Role Sought</h4>
            <p className="font-bold text-brand_red mb-4">{p.wanted_role}</p>
          </>
        )}

        <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
          Skills {isWanted ? "required" : "used / learned"}
        </h4>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.skills?.map(s => <span key={s} className="bg-sand text-muted text-xs px-2 py-1 rounded">{s}</span>)}
        </div>

        <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-1">Project Lead</h4>
        <p className="text-sm text-muted mb-4">{p.lead_name}</p>

        {/* Updates */}
        {p.project_updates?.length > 0 && (
          <>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mt-4 mb-2">
              Project Updates &amp; Prototypes
            </h4>
            <div className="flex flex-col gap-2">
              {p.project_updates.map(u => (
                <div key={u.id} className="bg-cream rounded-xl p-3 border-l-[3px] border-green-light">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-charcoal">{u.author}</span>
                    <span className="font-mono text-[0.65rem] text-muted">
                      {new Date(u.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal leading-relaxed">{u.body}</p>
                  {u.attachment && (
                    <span className="inline-flex items-center gap-1 mt-1.5 bg-white border border-green-DEFAULT/15
                      rounded px-2 py-0.5 text-[0.68rem] text-green-DEFAULT font-semibold">
                      📎 {u.attachment}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reach-out form (not shown for archived projects) */}
        {p.status !== "done" && (
          <ReachOutForm project={p} isWanted={isWanted} />
        )}
      </div>
    </div>
  );
}

function ReachOutForm({ project: p, isWanted }) {
  const textareaRef = useRef(null);

  const handleSend = () => {
    const message = textareaRef.current?.value?.trim();
    if (!message) {
      alert("Please write a message first.");
      return;
    }
    // In a real app you'd POST to /api/messages here
    alert("Message sent! (Wire up an email API in a real deployment.)");
    if (textareaRef.current) textareaRef.current.value = "";
  };

  return (
    <div className="mt-4 pt-4 border-t border-sand">
      <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
        {isWanted ? "Apply for this role" : "Reach out to join this project"}
      </h4>
      <textarea
        ref={textareaRef}
        placeholder={`Hi ${p.lead_name?.split(" ")[0]}, I'm a [year] student in [major]. I'm interested because…`}
        rows={3}
        className="w-full font-sans text-sm bg-cream border-[1.5px] border-green-DEFAULT/15 rounded-xl
          px-3 py-2 outline-none resize-y transition-all focus:border-green-DEFAULT focus:bg-white"
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-bold text-white border-none cursor-pointer font-sans transition-all
            ${isWanted ? "bg-brand_red hover:bg-[#a93226]" : "bg-green-DEFAULT hover:bg-green-mid"}`}
          onClick={handleSend}
        >
          Send Message →
        </button>
        <span className="text-xs text-muted">They&apos;ll reply to your email</span>
      </div>
    </div>
  );
}
