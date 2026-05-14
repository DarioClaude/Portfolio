/**
 * Sanity Studio embedded route — available at /studio
 * https://www.sanity.io/docs/embedding-sanity-studio
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
