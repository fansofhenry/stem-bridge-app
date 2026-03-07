// components/ProjectCard.jsx — pure display card (no state needed)
import { AREA_META, STATUS_META } from "@/lib/projects";

export default function ProjectCard({ project: p, onClick }) {
  const area   = AREA_META[p.area]   || AREA_META.other;
  const status = STATUS_META[p.status] || STATUS_META.idea;
  const isWanted = p.status === "wanted";
  const latestUpdate = p.project_updates?.[0];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick()}
      className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer relative overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group
        ${isWanted ? "border-l-4 border-l-brand_red border-t border-r border-b border-green-DEFAULT/7"
                   : "border border-green-DEFAULT/7"}
        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]
        before:bg-gradient-to-r before:from-green-light before:to-gold-DEFAULT
        before:scale-x-0 before:origin-left before:transition-transform before:duration-300
        group-hover:before:scale-x-100`}
    >
      {/* Header row */}
      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: p.bg_color }}>
          {p.icon}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`status-tag ${status.pillClass}`}>{status.label}</span>
          <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${area.classes}`}>
            {area.label}
          </span>
        </div>
      </div>

      {/* Title + description */}
      <div className="font-bold text-[0.92rem] text-charcoal leading-snug mb-1">{p.title}</div>
      <div className="text-[0.82rem] text-muted leading-relaxed">{p.description}</div>

      {/* Wanted role banner */}
      {isWanted && (
        <div className="mt-3 bg-red-50 border border-brand_red/15 rounded-xl px-3 py-2 text-xs text-[#a93226]">
          <strong className="block text-[0.68rem] uppercase tracking-wide opacity-70 mb-0.5">Skill Sought</strong>
          {p.skills?.join(" · ")}
        </div>
      )}

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-sand">
        {!isWanted && p.skills?.map(s => (
          <span key={s} className="bg-sand text-muted text-[0.67rem] font-medium px-2 py-0.5 rounded">{s}</span>
        ))}
        <span className="bg-green-DEFAULT/8 text-green-DEFAULT text-[0.67rem] font-medium px-2 py-0.5 rounded">
          {p.community}
        </span>
      </div>

      {/* Footer: lead + CTA */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-1.5 text-[0.72rem] text-muted">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-light to-green-DEFAULT
            flex items-center justify-center text-[0.6rem] text-white font-bold flex-shrink-0">
            {p.lead_name?.[0]}
          </div>
          {p.lead_name} ·{" "}
          <span className="font-mono text-[0.65rem] bg-sand px-1.5 py-0.5 rounded">
            {p.time_commitment}
          </span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onClick(); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-none cursor-pointer transition-all font-sans
            ${p.status === "done"
              ? "bg-transparent text-green-DEFAULT border-[1.5px] border-green-DEFAULT hover:bg-green-DEFAULT hover:text-white"
              : isWanted
              ? "bg-brand_red text-white hover:bg-[#a93226]"
              : "bg-green-DEFAULT text-white hover:bg-green-mid"}`}>
          {p.status === "done" ? "View Archive" : isWanted ? "Apply →" : "Join →"}
        </button>
      </div>

      {/* Latest update strip */}
      {latestUpdate && (
        <div className="mx-[-1.25rem] mb-[-1.25rem] mt-3 px-5 py-2.5
          bg-gradient-to-r from-green-DEFAULT/4 to-transparent border-t border-sand
          text-[0.72rem] text-muted flex gap-2 items-start">
          <span className="font-bold text-green-DEFAULT text-[0.63rem] uppercase tracking-wide
            bg-green-pale px-1.5 py-0.5 rounded whitespace-nowrap mt-0.5 flex-shrink-0">
            Latest
          </span>
          {latestUpdate.body.slice(0, 95)}{latestUpdate.body.length > 95 ? "…" : ""}
        </div>
      )}
    </div>
  );
}
