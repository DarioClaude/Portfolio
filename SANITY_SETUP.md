# Sanity CMS — Setup Guide

Everything in the codebase is ready. You just need to do **3 steps** to make the photo-management system live.

## What's already wired up

- **Studio embedded** at `/studio` (route: `src/app/studio/[[...tool]]/page.tsx`)
- **Schema** for `project` documents at `sanity/schemas/project.ts`
- **GROQ queries** + Sanity client in `src/lib/sanity.ts`
- **Data layer** in `src/lib/data.ts` that **automatically uses Sanity if env vars are set**, otherwise falls back to the local data in `src/lib/projects.ts`

## Step 1 — Create your Sanity project

1. Go to **https://www.sanity.io/manage** and sign in (free tier covers personal portfolios).
2. Click **Create new project**.
3. Name it (e.g. `Dario Tonini Portfolio`), pick the **production** dataset.
4. Copy the **Project ID** from the project dashboard (looks like `abcd1234`).
5. In the project's **API → CORS origins** settings, add:
   - `http://localhost:3000` (for local dev)
   - `https://your-vercel-domain.vercel.app` (replace with your real Vercel domain)
   - Tick **Allow credentials** for both.

## Step 2 — Local environment

Create a `.env.local` file at the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=abcd1234   # ← paste your project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Then:

```
npm run dev
```

Open **http://localhost:3000/studio** and log in. You can now upload projects, set cover images, build galleries, and reorder.

## Step 3 — Production environment (Vercel)

In Vercel → your project → **Settings → Environment Variables**, add the same three variables (for `Production`, `Preview`, and `Development` environments):

| Name                            | Value           |
| ------------------------------- | --------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abcd1234`      |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`    |
| `NEXT_PUBLIC_SANITY_API_VERSION`| `2024-01-01`    |

Redeploy. The live site at `https://your-domain/studio` will work, and the public pages will fetch data from Sanity automatically.

## How it works after setup

- Add a new project in `/studio` → it appears on `/work` and on the home carousel (first 6 by `order` field).
- The data layer in `src/lib/data.ts` calls Sanity. If Sanity is unreachable or returns nothing, it falls back to the local static data, so the site **never breaks** if Sanity is down.
- Images are served from Sanity's CDN (`cdn.sanity.io`, already whitelisted in `next.config.mjs`).

## Schema fields

Each project document has:

- `title` — display name
- `slug` — URL slug (auto-generated from title)
- `description` — text used on project pages
- `category` — Portrait / Editorial / Fine Art / Branding / Documentary
- `client`, `year`
- `order` — sort order (lower first; first 6 go to the home carousel)
- `coverImage` — main image (with hotspot)
- `gallery[]` — array of images, each with `landscape` or `portrait` format

Edit `sanity/schemas/project.ts` if you want to add fields.
