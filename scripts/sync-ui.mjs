import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "vendor/skymobile");

const exists = (p) => fs.existsSync(p);

const rimraf = (p) => {
  if (!exists(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
};

const copyDir = (src, dst) => {
  if (!exists(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const item of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, item.name);
    const d = path.join(dst, item.name);
    if (item.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
};

const copyFileIfExists = (src, dst) => {
  if (!exists(src)) return;
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
};

const DEST_COMPONENTS = path.join(ROOT, "src/components");
const DEST_STYLES = path.join(ROOT, "src/styles");
const DEST_PUBLIC_LOVABLE = path.join(ROOT, "public/lovable");

// clean targets
rimraf(DEST_COMPONENTS);
rimraf(DEST_STYLES);
rimraf(DEST_PUBLIC_LOVABLE);

// copy
copyDir(path.join(SRC_ROOT, "src/components"), DEST_COMPONENTS);
copyDir(path.join(SRC_ROOT, "src/styles"), DEST_STYLES);
copyDir(path.join(SRC_ROOT, "public"), DEST_PUBLIC_LOVABLE);

// optional globals
copyFileIfExists(
  path.join(SRC_ROOT, "src/index.css"),
  path.join(ROOT, "src/app/globals.lovable.css")
);
copyFileIfExists(
  path.join(SRC_ROOT, "src/globals.css"),
  path.join(ROOT, "src/app/globals.lovable.css")
);

console.log("✅ UI synced from vendor/skymobile");
