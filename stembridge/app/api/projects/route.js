// app/api/projects/route.js
// ─────────────────────────────────────────────────────────────
// Next.js Route Handler — acts like a mini REST API.
//
//   GET  /api/projects        → list all projects
//   POST /api/projects        → create a new project
//
// The frontend calls these endpoints when a user submits a form.
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { supabase }     from "@/lib/supabase";

// ── GET /api/projects ─────────────────────────────────────────
export async function GET() {
  const { data, error } = await supabase
    .from("projects")
    .select(`*, project_updates(*)`)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// ── POST /api/projects ────────────────────────────────────────
export async function POST(request) {
  // Parse the JSON body sent from the upload form
  const body = await request.json();

  // Basic server-side validation (never trust the client alone)
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

  const { data, error } = await supabase
    .from("projects")
    .insert([{
      icon:             body.icon            || "🚀",
      bg_color:         body.bg_color        || "#f0e8d5",
      title:            body.title,
      description:      body.description,
      long_desc:        body.long_desc,
      status:           body.status,
      area:             body.area,
      experience_level: body.experience_level || "beginner",
      time_commitment:  body.time_commitment,
      skills:           body.skills          || [],
      lead_name:        body.lead_name,
      lead_email:       body.lead_email,
      community:        body.community       || "General",
      wanted_role:      body.wanted_role     || null,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
