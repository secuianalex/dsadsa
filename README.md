# AI Learn — Full Platform

A complete learning platform: **Languages → Levels → Courses → Exams → Freestyle → Trophies → Progress**, with **NextAuth**.

## Quick start

1) Install deps
```bash
npm install
```

2) Copy env
```bash
# Windows
copy .env.example .env
# macOS/Linux
# cp .env.example .env
```

3) Prisma client & DB
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4) Seed 25 languages (with levels, courses, exams, freestyle)
```bash
npx prisma db seed
```

5) Run
```bash
npm run dev
# open http://localhost:3000
```

## Pages
- `/languages` — Browse languages → levels → courses. Links to course pages, exams, and freestyle.
- `/courses/[id]` — Course content + **Mark complete** + **Take Exam**.
- `/courses/[id]/exam` — Placeholder prompt from `/api/exam/[id]` + **Mark complete** (awards trophy).
- `/levels/[id]/freestyle` — Placeholder prompt from `/api/freestyle/[id]` + **Mark complete** (awards trophy).
- `/dashboard` — Shows your trophies + recent progress.
- `/api/languages` — Raw JSON for the catalog.

## Auth (dev)
Visit `/api/auth/signin` and enter any email + any password. A user with that email will be auto-created (DEV ONLY).

## Swap placeholder prompts with AI later
- Replace logic in:
  - `app/api/exam/[courseId]/route.ts`
  - `app/api/freestyle/[levelId]/route.ts`
with calls to your LLM provider.
