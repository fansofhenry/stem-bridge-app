// app/page.jsx
// ─────────────────────────────────────────────────────────────
// The home page — a SERVER component.
// It fetches projects from Supabase on the server (fast, SEO-friendly),
// then passes them down to interactive Client Components.
// ─────────────────────────────────────────────────────────────

import { getAllProjects, SEED_PROJECTS } from "@/lib/projects";
import Nav            from "@/components/Nav";
import Hero           from "@/components/Hero";
import RealityCheck   from "@/components/RealityCheck";
import ThreePaths     from "@/components/ThreePaths";
import ProjectSection from "@/components/ProjectSection";
import CrossPoll      from "@/components/CrossPoll";
import Problems       from "@/components/Problems";
import MatchQuiz      from "@/components/MatchQuiz";
import Sustain        from "@/components/Sustain";
import Resources      from "@/components/Resources";
import CtaBanner      from "@/components/CtaBanner";
import Footer         from "@/components/Footer";
import ScrollReveal   from "@/components/ScrollReveal";
import MobileBottomNav from "@/components/MobileBottomNav";

// Next.js will re-fetch and re-render this page every 60 seconds
// (Incremental Static Regeneration). Remove this for fully static.
export const revalidate = 60;

export default async function HomePage() {
  // Fetch projects from Supabase. This runs on the server — no loading spinner needed.
  let projects = [];
  let usingSeedData = false;
  try {
    projects = await getAllProjects();
  } catch (err) {
    console.error("Could not fetch projects:", err.message);
  }

  // Fallback to seed data if Supabase isn't configured or returned empty
  if (!projects || projects.length === 0) {
    projects = SEED_PROJECTS;
    usingSeedData = true;
  }

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero projectCount={projects.length} />
        <RealityCheck />
        <ThreePaths />
        {/* ProjectSection is a Client Component so it can handle filtering/search */}
        <ProjectSection initialProjects={projects} usingSeedData={usingSeedData} />
        <CrossPoll />
        <Problems />
        <MatchQuiz projects={projects} />
        <Sustain />
        <Resources />
        <CtaBanner />
      </main>
      <Footer />
      <MobileBottomNav />
      <ScrollReveal />
    </>
  );
  );
}
