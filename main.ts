// News-image entry: publish the composed front page as the entry image.
// The artwork is baked into entry.png at build time; this program only
// copies it to the output directory, so every run writes identical bytes.
// After copying, it checks the copy's size against the source so a
// truncated write fails loudly instead of shipping a broken image.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const source = join(here, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
if (statSync(source).size !== statSync(target).size) {
  throw new Error(`entry.png copy mismatch: ${source} -> ${target}`);
}
