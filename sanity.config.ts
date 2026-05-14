import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

/**
 * Studio config — embedded at /studio.
 * projectId falls back to a placeholder so the Next.js build succeeds
 * even before the user has wired up env vars; once they do, the Studio
 * connects to the real dataset automatically on the next request.
 */
export default defineConfig({
  name: "default",
  title: "Dario Tonini — Portfolio",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
