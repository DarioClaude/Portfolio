/**
 * Sanity environment variables.
 *
 * For the Studio (/studio) and live data to work, set these in:
 *  • .env.local (local dev)
 *  • Vercel → Project → Settings → Environment Variables (production)
 *
 * If the projectId is not set, the Studio will render a configuration
 * error and the site will fall back to local static data.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = !!projectId;
