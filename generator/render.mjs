import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = dirname(here);
const html = join(here, "meme.html");
const outDir = join(repo, "out");
const outPng = join(outDir, "meme-v2.png");

const candidates = [
  process.env.CHROMIUM_BIN,
  join(process.env.HOME || "", ".cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/headless_shell"),
  join(process.env.HOME || "", ".cache/ms-playwright/chromium-1255/chrome-linux64/chrome"),
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].filter(Boolean);

const bin = candidates.find((p) => existsSync(p));
if (!bin) {
  console.error("No Chromium binary found. Set CHROMIUM_BIN to a headless Chromium.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const args = [
  "--headless",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  `--window-size=1200,1200`,
  `--screenshot=${outPng}`,
  `file://${html}`,
];
const res = spawnSync(bin, args, { encoding: "utf8", timeout: 120000 });
if (res.error) {
  console.error("Failed to launch Chromium:", res.error.message);
  process.exit(1);
}
if (res.status !== 0) {
  console.error("Chromium exited with", res.status);
  console.error(res.stderr || res.stdout);
  process.exit(1);
}
if (!existsSync(outPng)) {
  console.error("Screenshot was not written:", outPng);
  process.exit(1);
}

// Verify the PNG is exactly 1200x1200 by reading its IHDR chunk.
const buf = readFileSync(outPng);
if (buf.length < 33 || buf.toString("ascii", 1, 4) !== "PNG") {
  console.error("Output is not a PNG file.");
  process.exit(1);
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log(`Rendered ${outPng} (${width}x${height}) with ${bin}`);
if (width !== 1200 || height !== 1200) {
  console.error("Expected exactly 1200x1200.");
  process.exit(1);
}
