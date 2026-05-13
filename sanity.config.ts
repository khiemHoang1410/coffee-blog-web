import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./sanity/schemas";

export default defineConfig({
  // Studio sẽ available tại /studio
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [structureTool()],

  schema: {
    types: schemas,
  },
});
