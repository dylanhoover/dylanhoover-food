import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://food.dylanhoover.dev",
  integrations: [sitemap()],
});
