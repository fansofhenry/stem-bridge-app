# 🌉 StemBridge

> STEM collaboration platform for Foothill College students.  
> Upload projects · Post wanted ads · Find collaborators · Cross-pollinate disciplines.

Built with **Next.js 14**, **Supabase**, and **Tailwind CSS**.

---

## 🗂 Repo Structure

```
stembridge/
├── app/
│   ├── layout.jsx          ← Root layout (fonts, metadata)
│   ├── page.jsx            ← Home page (server component — fetches from Supabase)
│   ├── globals.css         ← Global styles + Tailwind imports
│   └── api/
│       └── projects/
│           └── route.js    ← REST API: GET + POST /api/projects
├── components/
│   ├── Nav.jsx             ← Navigation + upload modal
│   ├── Hero.jsx            ← Landing hero section
│   ├── ThreePaths.jsx      ← "Find / Upload / Post Wanted" paths
│   ├── ProjectSection.jsx  ← Search bar + filter + project grid (client)
│   ├── ProjectCard.jsx     ← Individual project card
│   ├── ProjectModal.jsx    ← Project detail overlay
│   ├── CrossPoll.jsx       ← Cross-pollination section
│   ├── Problems.jsx        ← "Four barriers" dark section
│   ├── MatchQuiz.jsx       ← 3-question match quiz (client)
│   ├── Sustain.jsx         ← "How StemBridge keeps projects alive"
│   ├── Resources.jsx       ← Tabbed campus resources
│   ├── CtaBanner.jsx       ← Bottom CTA
│   └── Footer.jsx          ← Footer
├── lib/
│   ├── supabase.js         ← Supabase client (import this everywhere)
│   └── projects.js         ← Database query functions + label helpers
├── supabase/
│   └── schema.sql          ← Run this in Supabase SQL Editor to set up your DB
├── .env.local.example      ← Copy to .env.local and fill in your keys
└── README.md
```

---

## 🚀 Setup (step by step)

### 1 — Prerequisites
- [Node.js 18+](https://nodejs.org/) installed
- A free [Supabase](https://supabase.com) account
- A free [Vercel](https://vercel.com) account (for deployment)

### 2 — Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/stembridge.git
cd stembridge
npm install
```

### 3 — Set up Supabase
1. Go to [supabase.com](https://supabase.com) → **New project**
2. Once created: **SQL Editor → New Query**
3. Paste the entire contents of `supabase/schema.sql` and click **Run**
4. Go to **Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4 — Configure environment variables
```bash
cp .env.local.example .env.local
# Open .env.local and fill in your two Supabase values
```

### 5 — Run locally
```bash
npm run dev
# Open http://localhost:3000
```

---

## ☁️ Deploy to Vercel (free)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** — done! ✅

Vercel auto-deploys on every `git push`.

---

## 🛠 Adding Features (next steps)

| Feature | What to build |
|---|---|
| User accounts | Add [Supabase Auth](https://supabase.com/docs/guides/auth) + `/app/login/page.jsx` |
| Email notifications | [Resend](https://resend.com) or Supabase Edge Functions |
| Image uploads | Supabase Storage — add to project update form |
| Project pages | `/app/projects/[id]/page.jsx` — dedicated URL per project |
| Admin dashboard | `/app/admin/page.jsx` — protected route for moderation |
| Search (fast) | [Supabase full-text search](https://supabase.com/docs/guides/database/full-text-search) |

---

## 🧪 Key Files for Beginners

| If you want to… | Edit this file |
|---|---|
| Change page content | `app/page.jsx` |
| Change a section's design | `components/<SectionName>.jsx` |
| Add a new database column | `supabase/schema.sql` + `lib/projects.js` |
| Add a new API endpoint | `app/api/<name>/route.js` |
| Change colors / fonts | `tailwind.config.js` |

---

Built by students, for students. Foothill Owls 🦉
