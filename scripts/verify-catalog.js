// Compares the rebuilt catalog against catalog-snapshot.json.
// Titles and keywords are expected to change; everything else must stay identical.
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const tmp = path.join(root, ".tmp-verify");

execSync(
    `npx tsc "${path.join(root, "data", "catalogKY.ts")}" --outDir "${tmp}" --module commonjs --target es2020 --skipLibCheck`,
    { cwd: root, stdio: "inherit" },
);

const { catalogKY } = require(path.join(tmp, "catalogKY.js"));
const snapshot = require("./catalog-snapshot.json");

const STABLE = ["id", "category", "photo", "price"];
const problems = [];

for (const lang of Object.keys(snapshot)) {
    const before = snapshot[lang];
    const after = catalogKY[lang];

    if (!after) {
        problems.push(`${lang}: missing in rebuilt catalog`);
        continue;
    }
    if (before.length !== after.length) {
        problems.push(`${lang}: length ${before.length} -> ${after.length}`);
    }

    before.forEach((oldItem, i) => {
        const newItem = after[i];
        if (!newItem) {
            problems.push(`${lang}[${i}] id=${oldItem.id}: missing`);
            return;
        }
        STABLE.forEach((field) => {
            if (oldItem[field] !== newItem[field]) {
                problems.push(`${lang} id=${oldItem.id} ${field}: ${JSON.stringify(oldItem[field])} -> ${JSON.stringify(newItem[field])}`);
            }
        });
        if (JSON.stringify(oldItem.sizes) !== JSON.stringify(newItem.sizes)) {
            problems.push(`${lang} id=${oldItem.id} sizes: ${JSON.stringify(oldItem.sizes)} -> ${JSON.stringify(newItem.sizes)}`);
        }
        if (!newItem.title || !newItem.title.trim()) {
            problems.push(`${lang} id=${oldItem.id}: empty title`);
        }
        if (!newItem.keywords || newItem.keywords.length === 0) {
            problems.push(`${lang} id=${oldItem.id}: no keywords`);
        }
    });
}

fs.rmSync(tmp, { recursive: true, force: true });

if (problems.length) {
    console.error("MISMATCHES (" + problems.length + "):");
    problems.slice(0, 40).forEach((p) => console.error(" -", p));
    process.exit(1);
}

console.log("OK: ids, categories, photos, prices and sizes unchanged in all languages.");
console.log("Sample titles (ky):");
catalogKY.ky.slice(0, 3).concat(catalogKY.ky.slice(25, 27), catalogKY.ky.slice(-2)).forEach((p) => {
    console.log("  ", p.id, "|", p.title, "|", p.category);
});
