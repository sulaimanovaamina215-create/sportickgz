import fs from "fs";
import path from "path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const outDir = "D:/sportickgz/public/certificates";
fs.mkdirSync(outDir, { recursive: true });

const files = [
    { src: "D:/sportickgz/public/certificates/games.pdf", slug: "games" },
    { src: "D:/sportickgz/public/certificates/pearl-of.pdf", slug: "pearl-of" },
    { src: "D:/sportickgz/public/certificates/kyrgyz-respublikasy.pdf", slug: "kyrgyz" },
];

const CMAP_URL = "D:/sportickgz/node_modules/pdfjs-dist/cmaps/";
const STANDARD_FONT_DATA_URL = "D:/sportickgz/node_modules/pdfjs-dist/standard_fonts/";

for (const file of files) {
    const data = new Uint8Array(fs.readFileSync(file.src));
    const pdf = await getDocument({
        data,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
        standardFontDataUrl: STANDARD_FONT_DATA_URL,
    }).promise;
    console.log(file.slug, "pages", pdf.numPages);
    const n = Math.min(pdf.numPages, 4);
    for (let i = 1; i <= n; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.6 });
        const canvasAndContext = pdf.canvasFactory.create(viewport.width, viewport.height);
        await page.render({ canvasContext: canvasAndContext.context, viewport }).promise;
        const image = canvasAndContext.canvas.toBuffer("image/jpeg");
        const dest = path.join(outDir, `${file.slug}-${i}.jpg`);
        fs.writeFileSync(dest, image);
        console.log(" wrote", dest, image.length);
        page.cleanup();
    }
}
