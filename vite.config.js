import { vitePlugin as remix } from "@remix-run/dev";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();

export default defineConfig({
  plugins: [remix(), tailwindcss()],
});
