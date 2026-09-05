// Dumps data/catalogKY.ts to JSON so a refactor can be diffed against the original.
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "catalogKY.ts");
const src = fs.readFileSync(file, "utf8");

const start = src.indexOf("{", src.indexOf("="));
const end = src.lastIndexOf("}");
const literal = src.slice(start, end + 1);

// The file is pure literal data, so evaluating it is enough to read it.
const catalog = eval("(" + literal + ")");

const out = path.join(__dirname, "catalog-snapshot.json");
fs.writeFileSync(out, JSON.stringify(catalog, null, 2), "utf8");

const langs = Object.keys(catalog);
console.log("langs:", langs.join(", "));
langs.forEach((l) => console.log(l, "items:", catalog[l].length));
console.log("written:", out);
