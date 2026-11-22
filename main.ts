import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const postPath = join(repoRoot, "POST.json");
const post = JSON.parse(readFileSync(postPath, "utf8"));
if (typeof post.url !== "string" || !post.url) {
  throw new Error("POST.json has no url string");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postPath, join(outDir, "POST.json"));
