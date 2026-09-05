// Exercises lib/search.ts against the real catalogue.
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const tmp = path.join(root, ".tmp-search");

const tsconfigPath = path.join(root, "tsconfig.search-test.json");
fs.writeFileSync(
    tsconfigPath,
    JSON.stringify({
        compilerOptions: {
            outDir: ".tmp-search",
            module: "commonjs",
            target: "es2020",
            moduleResolution: "node",
            skipLibCheck: true,
            baseUrl: ".",
            paths: { "@/*": ["./*"] },
        },
        files: ["lib/search.ts", "data/catalogKY.ts"],
    }),
    "utf8",
);

try {
    execSync(`npx tsc -p "${tsconfigPath}"`, { cwd: root, stdio: "inherit" });
} finally {
    fs.rmSync(tsconfigPath, { force: true });
}

const { catalogKY } = require(path.join(tmp, "data", "catalogKY.js"));
const search = require(path.join(tmp, "lib", "search.js"));

const cases = [
    ["ky", "форма", "exact word"],
    ["ky", "forma", "latin typed, cyrillic data"],
    ["ky", "фрма", "missing letter"],
    ["ky", "форам", "swapped letters"],
    ["ky", "кызыл форма", "two words"],
    ["ky", "форма кызыл", "reversed word order"],
    ["ky", "манишка", "product name"],
    ["ky", "manishka", "product name in latin"],
    ["ky", "ак манишка", "colour + product"],
    ["ky", "сумка", "bag"],
    ["ky", "гетри", "socks"],
    ["ky", "гетры", "socks, russian spelling in kyrgyz mode"],
    ["ky", "ветровка", "windbreaker"],
    ["ky", "XL", "size"],
    ["ky", "1000", "price"],
    ["ky", "dem", "brand"],
    ["ru", "футбольная форма", "full ru name"],
    ["ru", "майка", "synonym"],
    ["ru", "джерси", "synonym"],
    ["ru", "чёрная форма", "colour with ё"],
    ["ru", "черная форма", "colour without ё"],
    ["ru", "спортивная сумка", "two words ru"],
    ["ru", "полузамок", "category"],
    ["en", "football kit", "en name"],
    ["en", "форма", "cyrillic query while site is english"],
    ["en", "blue bag", "colour + product en"],
    ["en", "bib", "en bib"],
    ["ky", "xxxyyy", "nonsense, expect zero"],
];

let failures = 0;

for (const [lang, query, note] of cases) {
    const products = catalogKY[lang];
    const index = search.buildIndex(products);
    const hits = search.searchProducts(index, query);
    const top = hits.slice(0, 3).map((h) => `${h.product.title} [${h.product.category}]`);

    const expectZero = query === "xxxyyy";
    const ok = expectZero ? hits.length === 0 : hits.length > 0;
    if (!ok) failures++;

    console.log(`${ok ? "ok  " : "FAIL"} ${lang} "${query}" (${note}) -> ${hits.length} hits`);
    top.forEach((t) => console.log("       ", t));

    if (hits.length === 0 && !expectZero) {
        console.log("        did you mean:", search.suggestCorrection(products, query));
    }
}

// Suggestions and the "did you mean" path
const kyIndex = search.buildIndex(catalogKY.ky);
console.log("\nsuggestions for \"фор\":");
search.buildSuggestions(kyIndex, "фор").forEach((s) => console.log("  ", s.type, "|", s.label, "|", s.count));

console.log("\ndid you mean \"манышка\":", search.suggestCorrection(catalogKY.ky, "манышка"));
console.log("did you mean \"сумке\":", search.suggestCorrection(catalogKY.ky, "сумкааа"));

fs.rmSync(tmp, { recursive: true, force: true });

console.log(failures === 0 ? "\nALL CASES PASSED" : `\n${failures} CASE(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
