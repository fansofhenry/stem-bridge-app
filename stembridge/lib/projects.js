// lib/projects.js
// ─────────────────────────────────────────────────────────────
// All database query functions for projects.
// Keep data logic here, out of your components.
// ─────────────────────────────────────────────────────────────

import { supabase } from "./supabase";

// ── READ ─────────────────────────────────────────────────────

/**
 * Fetch all projects, newest first, including their updates.
 */
export async function getAllProjects() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_updates (
        id, author, body, attachment, created_at
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single project by ID, including updates.
 */
export async function getProjectById(id) {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("projects")
    .select(`*, project_updates (*)`)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ── WRITE ────────────────────────────────────────────────────

/**
 * Create a new project.
 * @param {object} project - Fields matching the projects table
 */
export async function createProject(project) {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Add an update post to an existing project.
 */
export async function addProjectUpdate({ projectId, author, body, attachment }) {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("project_updates")
    .insert([{ project_id: projectId, author, body, attachment }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ── SEED DATA FALLBACK ──────────────────────────────────────
// When Supabase isn't configured yet, the app shows these projects
// so the UI is functional during setup and demos.

export const SEED_PROJECTS = [
  {
    id: 1, icon: "🤖", bg_color: "#f0e8d5",
    title: "Student-Project Matching Engine",
    description: "Building a machine learning recommender that matches students to campus projects based on major, skill level, and available time.",
    long_desc: "This is Task 5 of StemBridge. Students answer three questions and instantly see their top 3 matching projects. Built on ML techniques from CS coursework, with the tagging system feeding the recommendation engine.",
    status: "progress", area: "cs", experience_level: "solid",
    time_commitment: "3–5 hrs/wk",
    skills: ["Python", "Machine Learning", "Data Science", "JavaScript"],
    lead_name: "Cris R.", lead_email: "cris@foothill.edu", community: "MESA",
    project_updates: [
      { id: 1, author: "Cris R.", body: "Finished the scoring logic for the matching algorithm. Testing with sample student profiles this week.", attachment: null, created_at: "2025-04-15T00:00:00Z" },
      { id: 2, author: "Cris R.", body: "30-day ping system is complete. Moving on to the ML layer now.", attachment: "🖼 ping-system-diagram.png", created_at: "2025-05-01T00:00:00Z" },
    ],
  },
  {
    id: 2, icon: "🌱", bg_color: "#e8f4ee",
    title: "Campus Sustainability Tracker",
    description: "Interactive dashboard tracking Foothill's sustainability initiatives — energy use, food waste, transportation.",
    long_desc: "We want to make Foothill's sustainability data visible and beautiful. Right now it's scattered across PDFs. We're building a public dashboard any student or faculty can check.",
    status: "collab", area: "science", experience_level: "beginner",
    time_commitment: "2 hrs/wk",
    skills: ["Data Visualization", "Figma", "HTML/CSS", "Beginner OK"],
    lead_name: "Maya T.", lead_email: "maya@foothill.edu", community: "Puente",
    project_updates: [
      { id: 3, author: "Maya T.", body: "Facilities said yes to data access! Starting data collection next week.", attachment: "🖼 data-structure-sketch.png", created_at: "2025-04-20T00:00:00Z" },
    ],
  },
  {
    id: 3, icon: "🔬", bg_color: "#fce8e8",
    title: "CRISPR Explainer for Community Audiences",
    description: "Short-form multimedia explainer series about CRISPR and gene editing for community college students.",
    long_desc: "The goal is to make cutting-edge biotech understandable for students without a research background. 5-minute explainer videos with accurate science and compelling storytelling.",
    status: "idea", area: "science", experience_level: "some",
    time_commitment: "2 hrs/wk",
    skills: ["Biology", "Science Writing", "Video Production", "Research"],
    lead_name: "Ahmed F.", lead_email: "ahmed@foothill.edu", community: "MESA",
    project_updates: [],
  },
  {
    id: 4, icon: "📊", bg_color: "#fef4e0",
    title: "Food Insecurity Data Dashboard",
    description: "Built a public-facing dashboard showing food insecurity trends at Foothill, pulling from Panther Pantry data. Archived.",
    long_desc: "Project complete and archived. The dashboard is live and used by campus food access advocates. Fork the archive and keep building.",
    status: "done", area: "social", experience_level: "solid",
    time_commitment: "—",
    skills: ["Python", "Data Analysis", "D3.js", "Social Justice"],
    lead_name: "Jordan K.", lead_email: "jordan@foothill.edu", community: "MESA",
    project_updates: [],
  },
  {
    id: 5, icon: "📣", bg_color: "#fde8e6",
    title: "WANTED: Python Developer for ML Matching",
    description: "Looking for a Python developer to help build StemBridge's recommendation algorithm.",
    long_desc: "We need someone comfortable writing Python functions (CS 1C or equivalent). About 2 hours per week.",
    status: "wanted", area: "cs", experience_level: "some",
    time_commitment: "2 hrs/wk",
    skills: ["Python", "Scikit-learn", "Data Structures"],
    lead_name: "Cris R.", lead_email: "cris@foothill.edu", community: "MESA",
    wanted_role: "Python Developer",
    project_updates: [],
  },
  {
    id: 6, icon: "🎨", bg_color: "#f3e8ff",
    title: "Accessible STEM Infographics",
    description: "Creating a library of screen-reader-friendly infographics that explain core STEM concepts for visually impaired students.",
    long_desc: "Most STEM infographics are inaccessible. We're building a set of interactive, alt-text-rich, color-blind-safe visual explainers that work for everyone. Art and design students especially welcome.",
    status: "collab", area: "art", experience_level: "beginner",
    time_commitment: "1–2 hrs/wk",
    skills: ["Figma", "Accessibility", "Illustration", "Alt Text"],
    lead_name: "Sara L.", lead_email: "sara@foothill.edu", community: "Umoja",
    project_updates: [],
  },
  {
    id: 7, icon: "💼", bg_color: "#fef9e7",
    title: "First-Gen Resume Builder",
    description: "A tool that helps first-generation students translate campus project experience into professional resume language.",
    long_desc: "Many first-gen students don't know how to describe what they've built. This tool takes your StemBridge project history and generates resume bullets using industry language. Business and CS students collaborating.",
    status: "progress", area: "business", experience_level: "some",
    time_commitment: "3–5 hrs/wk",
    skills: ["React", "UX Writing", "Career Services", "JavaScript"],
    lead_name: "Henry N.", lead_email: "henry@foothill.edu", community: "General",
    project_updates: [
      { id: 4, author: "Henry N.", body: "MVP wireframes done. Need a UX designer to review the flow before we build.", attachment: null, created_at: "2025-05-10T00:00:00Z" },
    ],
  },
  {
    id: 8, icon: "📣", bg_color: "#fde8e6",
    title: "WANTED: UX Designer for Resume Tool",
    description: "Need a UX designer to review wireframes and design the interface for our first-gen resume builder.",
    long_desc: "We have wireframes and a working prototype but need someone with design skills to make the UX intuitive. Especially looking for students with Figma experience.",
    status: "wanted", area: "art", experience_level: "some",
    time_commitment: "Flexible",
    skills: ["Figma", "UX Design", "User Research"],
    lead_name: "Henry N.", lead_email: "henry@foothill.edu", community: "General",
    wanted_role: "UX Designer",
    project_updates: [],
  },
];

// ── HELPERS ──────────────────────────────────────────────────

/** Human-readable label + Tailwind classes for each area */
export const AREA_META = {
  cs:       { label: "CS/Tech",       classes: "bg-blue-100 text-blue-800" },
  social:   { label: "Social Justice", classes: "bg-green-100 text-green-800" },
  art:      { label: "Art/Design",    classes: "bg-purple-100 text-purple-800" },
  science:  { label: "Science",       classes: "bg-red-100 text-red-800" },
  business: { label: "Business",      classes: "bg-yellow-100 text-yellow-800" },
  other:    { label: "Other",         classes: "bg-gray-100 text-gray-600" },
};

/** Label + CSS classes for each project status */
export const STATUS_META = {
  idea:     { label: "Idea!",                    dotClass: "bg-purple-400", pillClass: "bg-purple-100 text-purple-700" },
  collab:   { label: "Looking for Collaborators!", dotClass: "bg-yellow-500", pillClass: "bg-yellow-100 text-yellow-700" },
  progress: { label: "In Progress!",             dotClass: "bg-blue-400 animate-pulse", pillClass: "bg-blue-100 text-blue-700" },
  done:     { label: "Completed!",               dotClass: "bg-emerald-500", pillClass: "bg-emerald-100 text-emerald-700" },
  wanted:   { label: "Wanted Ad",                dotClass: "bg-red-400 animate-pulse", pillClass: "bg-red-100 text-red-700" },
};
