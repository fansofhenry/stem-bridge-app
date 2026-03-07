-- ============================================================
-- StemBridge — Supabase Schema
-- ============================================================
-- Run this entire file in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id          BIGSERIAL PRIMARY KEY,
  icon        TEXT        NOT NULL DEFAULT '🚀',
  bg_color    TEXT        NOT NULL DEFAULT '#f0e8d5',
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,            -- short (shown on card)
  long_desc   TEXT        NOT NULL,            -- shown in modal
  status      TEXT        NOT NULL CHECK (status IN ('idea','collab','progress','done','wanted')),
  area        TEXT        NOT NULL CHECK (area IN ('cs','science','social','art','business','other')),
  experience_level TEXT   NOT NULL DEFAULT 'beginner' CHECK (experience_level IN ('beginner','some','solid','lead')),
  time_commitment TEXT    NOT NULL DEFAULT 'Flexible',
  skills      TEXT[]      NOT NULL DEFAULT '{}',   -- array of skill strings
  lead_name   TEXT        NOT NULL,
  lead_email  TEXT        NOT NULL,
  community   TEXT        NOT NULL DEFAULT 'General',
  wanted_role TEXT,                            -- only for "wanted" status
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updates table (linked to projects)
CREATE TABLE IF NOT EXISTS project_updates (
  id          BIGSERIAL PRIMARY KEY,
  project_id  BIGINT      NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  author      TEXT        NOT NULL,
  body        TEXT        NOT NULL,
  attachment  TEXT,                            -- filename string, optional
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Indexes for fast filtering ──
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_area   ON projects(area);
CREATE INDEX IF NOT EXISTS idx_updates_project ON project_updates(project_id);

-- ── Auto-update updated_at on any project edit ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON projects;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row Level Security ──
-- For now: anyone can read. Only authenticated users can insert.
-- (You can tighten this later with Supabase Auth.)
ALTER TABLE projects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Anyone can insert project"
  ON projects FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read updates"
  ON project_updates FOR SELECT USING (true);

CREATE POLICY "Anyone can insert update"
  ON project_updates FOR INSERT WITH CHECK (true);

-- ── Seed Data ──
INSERT INTO projects (icon, bg_color, title, description, long_desc, status, area, experience_level, time_commitment, skills, lead_name, lead_email, community) VALUES
(
  '🤖', '#f0e8d5',
  'Student-Project Matching Engine',
  'Building a machine learning recommender that matches students to campus projects based on major, skill level, and available time.',
  'This is Task 5 of StemBridge. Students answer three questions and instantly see their top 3 matching projects. Built on ML techniques from CS coursework, with the tagging system feeding the recommendation engine.',
  'progress', 'cs', 'solid', '3–5 hrs/wk',
  ARRAY['Python','Machine Learning','Data Science','JavaScript'],
  'Cris R.', 'cris@foothill.edu', 'MESA'
),
(
  '🌱', '#e8f4ee',
  'Campus Sustainability Tracker',
  'Interactive dashboard tracking Foothill''s sustainability initiatives — energy use, food waste, transportation.',
  'We want to make Foothill''s sustainability data visible and beautiful. Right now it''s scattered across PDFs. We''re building a public dashboard any student or faculty can check.',
  'collab', 'science', 'beginner', '2 hrs/wk',
  ARRAY['Data Visualization','Figma','HTML/CSS','Beginner OK'],
  'Maya T.', 'maya@foothill.edu', 'Puente'
),
(
  '🔬', '#fce8e8',
  'CRISPR Explainer for Community Audiences',
  'Short-form multimedia explainer series about CRISPR and gene editing for community college students.',
  'The goal is to make cutting-edge biotech understandable for students without a research background. 5-minute explainer videos with accurate science and compelling storytelling.',
  'idea', 'science', 'some', '2 hrs/wk',
  ARRAY['Biology','Science Writing','Video Production','Research'],
  'Ahmed F.', 'ahmed@foothill.edu', 'MESA'
),
(
  '📊', '#fef4e0',
  'Food Insecurity Data Dashboard',
  'Built a public-facing dashboard showing food insecurity trends at Foothill, pulling from Panther Pantry data. Archived.',
  'Project complete and archived. The dashboard is live and used by campus food access advocates. Fork the archive and keep building.',
  'done', 'social', 'solid', '—',
  ARRAY['Python','Data Analysis','D3.js','Social Justice'],
  'Jordan K.', 'jordan@foothill.edu', 'MESA'
),
(
  '📣', '#fde8e6',
  'WANTED: Python Developer for ML Matching',
  'Looking for a Python developer to help build StemBridge''s recommendation algorithm.',
  'We need someone comfortable writing Python functions (CS 1C or equivalent). About 2 hours per week.',
  'wanted', 'cs', 'some', '2 hrs/wk',
  ARRAY['Python','Scikit-learn','Data Structures'],
  'Cris R.', 'cris@foothill.edu', 'MESA'
);

-- Seed some updates
INSERT INTO project_updates (project_id, author, body, attachment) VALUES
(1, 'Cris R.', 'Finished the scoring logic for the matching algorithm. Testing with sample student profiles this week.', NULL),
(1, 'Cris R.', '30-day ping system is complete. Moving on to the ML layer now.', '🖼 ping-system-diagram.png'),
(2, 'Maya T.', 'Facilities said yes to data access! Starting data collection next week.', '🖼 data-structure-sketch.png');
