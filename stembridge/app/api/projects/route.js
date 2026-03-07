// app/api/projects/route.js
// ---------------------------------------------------------
// Next.js Route Handler — acts like a mini REST API.
//
//   GET  /api/projects        -> list all projects
//   POST /api/projects        -> create a new project
//
// The frontend calls these endpoints when a user submits a form.
// ---------------------------------------------------------

import { NextResponse } from "next/server";
import { supabase }     from "@/lib/supabase";

const VALID_STATUSES = ["idea", "collab", "progress", "done", "wanted"];
const VALID_AREAS = ["cs", "science", "social", "art", "business", "other"];
const VALID_LEVELS = ["beginner", "some", "solid", "lead"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(val) {
  return typeof val === "string" ? val.trim() : val;
}

// -- GET /api/projects -----------------------------------------------
export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("projects")
    .select(`*, project_updates(*)`)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// -- POST /api/projects ----------------------------------------------
export async function POST(request) {
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Trim all string fields
  for (const key of Object.keys(body)) {
    body[key] = trim(body[key]);
  }

  // Required fields
  const required = ["title", "description", "long_desc", "status", "area",
                    "time_commitment", "lead_name", "lead_email"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  // Validate enum fields
  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }
  if (!VALID_AREAS.includes(body.area)) {
    return NextResponse.json({ error: "Invalid area value" }, { status: 400 });
  }
  if (body.experience_level && !VALID_LEVELS.includes(body.experience_level)) {
    return NextResponse.json({ error: "Invalid experience_level value" }, { status: 400 });
  }

  // Validate email format
  if (!EMAIL_RE.test(body.lead_email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  // Length limits
  if (body.title.length > 200) {
    return NextResponse.json({ error: "Title too long (max 200 chars)" }, { status: 400 });
  }
  if (body.long_desc.length > 5000) {
    return NextResponse.json({ error: "Description too long (max 5000 chars)" }, { status: 400 });
  }

  // Sanitize skills array
  const skills = Array.isArray(body.skills)
    ? body.skills.filter(s => typeof s === "string").map(s => s.trim()).filter(Boolean).slice(0, 20)
    : [];

  const { data, error } = await supabase
    .from("projects")
    .insert([{
      icon:             trim(body.icon)             || "🚀",
      bg_color:         trim(body.bg_color)         || "#f0e8d5",
      title:            body.title,
      description:      body.description.slice(0, 500),
      long_desc:        body.long_desc,
      status:           body.status,
      area:             body.area,
      experience_level: body.experience_level        || "beginner",
      time_commitment:  body.time_commitment,
      skills,
      lead_name:        body.lead_name,
      lead_email:       body.lead_email,
      community:        trim(body.community)         || "General",
      wanted_role:      trim(body.wanted_role)        || null,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
