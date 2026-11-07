import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const pub = path.join(root, "public");
const hold = path.join(root, "public-full");

function listUnreadable(dir, rel = "") {
    const bad = [];
    for (const name of fs.readdirSync(dir)) {
        const from = path.join(dir, name);
        const relPath = rel ? path.join(rel, name) : name;
        if (fs.statSync(from).isDirectory()) {
            bad.push(...listUnreadable(from, relPath));
            continue;
        }
        try {
            const fd = fs.openSync(from, "r");
            fs.closeSync(fd);
        } catch {
            bad.push(relPath);
        }
    }
    return bad;
}

function linkReadable(src, dest, skip, rel = "") {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
        const from = path.join(src, name);
        const to = path.join(dest, name);
        const relPath = path.normalize(rel ? path.join(rel, name) : name);
        if (fs.statSync(from).isDirectory()) {
            linkReadable(from, to, skip, relPath);
            continue;
        }
        if (skip.has(relPath)) continue;
        try {
            fs.linkSync(from, to);
        } catch {
            fs.copyFileSync(from, to);
        }
    }
}

function runNext() {
    const result = spawnSync(process.execPath, [nextBin, "build"], {
        cwd: root,
        stdio: "inherit",
    });
    return result.status ?? 1;
}

const blocked = listUnreadable(pub);
if (blocked.length === 0) {
    process.exit(runNext());
}

console.warn(
    "Windows denied read access to these public files, so they are omitted from out:\n" +
        blocked.map((file) => `  ${file}`).join("\n"),
);

if (fs.existsSync(hold)) {
    console.error("public-full already exists. Rename it back to public, then build again.");
    process.exit(1);
}

fs.renameSync(pub, hold);
let code = 1;
try {
    linkReadable(hold, pub, new Set(blocked.map((file) => path.normalize(file))));
    code = runNext();
} finally {
    fs.rmSync(pub, { recursive: true, force: true });
    if (fs.existsSync(hold) && !fs.existsSync(pub)) {
        fs.renameSync(hold, pub);
    }
}
process.exit(code);
