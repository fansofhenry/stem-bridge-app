// components/ProjectSection.jsx — CLIENT component
// Handles search, filtering, and the project grid with real-time UI.
"use client";

import { useState, useMemo } from "react";
import ProjectCard  from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const STATUS_FILTERS = [
  { key:"all",      label:"All" },
  { key:"idea",     label:"💡 Ideas" },
  { key:"collab",   label:"🤝 Recruiting" },
  { key:"progress", label:"⚡ In Progress" },
  { key:"wanted",   label:"📣 Wanted Ads" },
  { key:"done",     label:"✅ Completed" },
];

export default function ProjectSection({ initialProjects }) {
  const [query,       setQuery]       = useState("");
  const [areaFilter,  setAreaFilter]  = useState("all");
  const [timeFilter,  setTimeFilter]  = useState("all");
  const [statusFilter,setStatusFilter]= useState("all");
  const [selected,    setSelected]    = useState(null); // project open in modal

  // Compute the filtered list. useMemo means we only recalculate when filters change.
  const filtered = useMemo(() => {
    let list = initialProjects;
    if (statusFilter !== "all") list = list.filter(p => p.status === statusFilter);
    if (areaFilter   !== "all") list = list.filter(p => p.area   === areaFilter);
    if (timeFilter === "light")  list = list.filter(p => p.time_commitment?.includes("1") || p.time_commitment?.includes("2"));
    if (timeFilter === "steady") list = list.filter(p => p.time_commitment?.includes("3") || p.time_commitment?.includes("5"));
    if (timeFilter === "deep")   list = list.filter(p => p.time_commitment?.includes("6"));
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.skills?.some(s => s.toLowerCase().includes(q)) ||
        p.wanted_role?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [initialProjects, query, areaFilter, timeFilter, statusFilter]);

  return (
    <>
      {/* ── Sticky search + filter bar ── */}
      <div id="search-anchor" />
      <div className="sticky top-[68px] z-30 bg-white border-b-2 border-sand px-[5vw] py-3 shadow-sm">
        <div className="flex gap-3 items-center flex-wrap">
          {/* Search */}
          <div className="relative flex-[2] min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none">🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by keyword, skill, theme, discipline…"
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border-[1.5px] border-green-DEFAULT/16 bg-cream text-sm font-sans
                outline-none transition-all focus:border-green-DEFAULT focus:bg-white focus:ring-2 focus:ring-green-DEFAULT/8"
            />
          </div>
          {/* Area dropdown */}
          <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)}
            className="border-[1.5px] border-green-DEFAULT/16 text-muted px-3 py-2 rounded-full text-xs font-medium
              bg-white font-sans outline-none cursor-pointer">
            <option value="all">All Disciplines</option>
            <option value="cs">💻 CS / Tech</option>
            <option value="science">🔬 Science</option>
            <option value="social">🌍 Social Justice</option>
            <option value="art">🎨 Art / Design</option>
            <option value="business">📈 Business</option>
          </select>
          {/* Time dropdown */}
          <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}
            className="border-[1.5px] border-green-DEFAULT/16 text-muted px-3 py-2 rounded-full text-xs font-medium
              bg-white font-sans outline-none cursor-pointer">
            <option value="all">Any Time Commitment</option>
            <option value="light">Light (1–2 hrs/wk)</option>
            <option value="steady">Steady (3–5 hrs/wk)</option>
            <option value="deep">Deep (6+ hrs/wk)</option>
          </select>
          <span className="text-xs text-muted ml-auto font-mono whitespace-nowrap">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Status filter pills */}
        <div className="flex gap-2 flex-wrap mt-3 pt-3 border-t border-sand items-center">
          <span className="text-[0.68rem] font-bold text-muted uppercase tracking-widest mr-1">Type:</span>
          {STATUS_FILTERS.map(f => (
            <button key={f.key} onClick={() => setStatusFilter(f.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer font-sans
                ${statusFilter === f.key
                  ? f.key === "wanted"
                    ? "bg-brand_red text-white border-brand_red"
                    : "bg-green-DEFAULT text-white border-green-DEFAULT"
                  : "bg-white text-muted border-green-DEFAULT/15 hover:border-green-DEFAULT/40"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Project grid ── */}
      <div className="px-[5vw] py-9 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-14 text-muted">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-bold text-charcoal mb-1">No projects found</p>
            <p className="text-sm">Try different filters, or upload your project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        )}
      </div>

      {/* ── Project detail modal ── */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
