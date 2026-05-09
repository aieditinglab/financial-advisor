# Financial Advisor Website — Setup Guide

Your website is fully built and ready. Run these commands in Cursor's terminal to finish setup.

---

## Step 1 — Open in Cursor

In Cursor, open the folder:
```
C:\Users\noell\OneDrive\Documents\Claude\Projects\Financial Advisor\financial-advisor
```

---

## Step 2 — Install dependencies

```bash
npm install
```

Then verify it runs:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the full site.

---

## Step 3 — Initialize Git & push to GitHub

The `.git` folder was created but has a stale lock file from the sandbox. Run this in Cursor's terminal:

```bash
# Remove the stale lock file
del .git\index.lock

# Configure git (already set in .git/config, but just in case)
git config user.name "Ayden"
git config user.email "hoopzproductions7@gmail.com"

# Stage everything and make initial commit
git add -A
git commit -m "feat: initial financial advisor website"

# Rename branch to main
git branch -M main

# Create a new repo on GitHub at https://github.com/new
# Name it: financial-advisor
# Then add the remote and push:
git remote add origin https://github.com/YOUR_USERNAME/financial-advisor.git
git push -u origin main
```

---

## Step 4 — Deploy to Vercel

Option A — Vercel CLI (recommended):
```bash
npm i -g vercel
vercel
```
Follow the prompts. Vercel auto-detects Next.js.

Option B — GitHub integration:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `financial-advisor` GitHub repo
3. Click Deploy — done.

---

## Project structure

```
financial-advisor/
├── app/
│   ├── globals.css        # Navy/gold/cream design tokens
│   ├── layout.tsx         # Metadata + Geist font
│   └── page.tsx           # Assembles all sections
├── components/
│   ├── Navbar.tsx         # Sticky nav with mobile menu
│   ├── Hero.tsx           # Full-screen hero + stats
│   ├── Services.tsx       # 6-service grid
│   ├── Approach.tsx       # 4 fiduciary principles
│   ├── About.tsx          # Team cards + firm bar
│   ├── Testimonials.tsx   # 4 client quotes
│   ├── Contact.tsx        # Contact form with success state
│   └── Footer.tsx         # 4-column footer
└── SETUP.md               # This file
```

---

## Design notes

The site uses a **navy + gold + cream** palette with:
- `#0F1C2E` — deep navy (backgrounds, text)
- `#C9A84C` — warm gold (accents, CTAs)
- `#FAFAF8` — warm cream (light backgrounds)

All styling is inline CSS (no Tailwind class dependency issues) with clean transitions and hover states throughout.
