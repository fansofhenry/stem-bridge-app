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
  const { data, error } = await supabase
    .from("project_updates")
    .insert([{ project_id: projectId, author, body, attachment }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

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
