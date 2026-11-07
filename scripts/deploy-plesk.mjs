import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const base = "https://hosting.satcom.kg:8443";
const user = process.env.PLESK_USER || "sportic_kg";
const pass = process.env.PLESK_PASSWORD || "";
const domainId = "1823";
const cookie = path.join(os.tmpdir(), "sportic-plesk-cookie.txt");
const zipPath = path.join(os.tmpdir(), "sportic-release.zip");
const zipName = "sportic-release.zip";

if (!pass) {
    console.error("PLESK_PASSWORD is missing.");
    process.exit(1);
}

function curl(args) {
    const result = spawnSync("curl", ["-k", "-sS", "--max-time", "1800", ...args], {
        encoding: "utf8",
    });
    if (result.error) throw result.error;
    return { status: result.status ?? 1, stdout: result.stdout || "", stderr: result.stderr || "" };
}

function must(result, label) {
    if (result.status !== 0) {
        console.error(label, result.stderr.slice(0, 500));
        process.exit(1);
    }
    return result.stdout;
}

function login() {
    fs.rmSync(cookie, { force: true });
    const body = new URLSearchParams({
        login_name: user,
        passwd: pass,
        locale_id: "default",
    }).toString();
    const result = curl([
        "-c", cookie,
        "-D", "-",
        "-o", os.devNull,
        "-X", "POST",
        `${base}/login_up.php`,
        "--data", body,
    ]);
    must(result, "login failed");
    if (!result.stdout.includes("303") && !result.stdout.includes("302")) {
        console.error("Plesk did not accept the login.");
        process.exit(1);
    }
}

function forgeryToken() {
    const html = must(
        curl(["-b", cookie, `${base}/smb/file-manager/list/domainId/${domainId}`]),
        "file manager failed",
    );
    const token = html.match(/forgery_protection_token" content="([^"]+)"/)?.[1];
    if (!token) {
        console.error("Could not read the Plesk form token.");
        process.exit(1);
    }
    return token;
}

function pack() {
    fs.rmSync(zipPath, { force: true });
    if (process.platform === "win32") {
        execFileSync("tar", ["-a", "-cf", zipPath, "-C", "out", "."], { stdio: "inherit" });
    } else {
        execFileSync("zip", ["-r", "-q", zipPath, "."], { cwd: "out", stdio: "inherit" });
    }
    const size = fs.statSync(zipPath).size;
    console.log(`archive ${(size / 1024 / 1024).toFixed(1)} MB`);
}

function upload(token) {
    const out = must(
        curl([
            "-b", cookie,
            "-H", `X-Forgery-Protection-Token: ${token}`,
            "-F", `file=@${zipPath};filename=${zipName}`,
            "-F", "currentDir=/httpdocs",
            `${base}/smb/file-manager/upload/domainId/${domainId}`,
        ]),
        "upload failed",
    );
    if (!out.includes("SUCCESS")) {
        console.error(out.slice(0, 500));
        process.exit(1);
    }
    console.log("uploaded");
}

function extract(token) {
    const out = must(
        curl([
            "-b", cookie,
            "-H", `X-Forgery-Protection-Token: ${token}`,
            "-H", "Content-Type: application/x-www-form-urlencoded",
            "--data", `ids[0]=${zipName}`,
            `${base}/smb/file-manager/extract-archive/domainId/${domainId}?destinationDir=%2Fhttpdocs&overwrite=true`,
        ]),
        "extract failed",
    );
    if (!out.includes("statusMessages")) {
        console.error(out.slice(0, 500));
        process.exit(1);
    }
    console.log("extracted");
}

function remove(token, name) {
    curl([
        "-b", cookie,
        "-H", `X-Forgery-Protection-Token: ${token}`,
        "-H", "Content-Type: application/x-www-form-urlencoded",
        "--data", `ids[0]=${name}`,
        `${base}/smb/file-manager/delete/domainId/${domainId}?currentDir=%2Fhttpdocs`,
    ]);
}

login();
const token = forgeryToken();
pack();
upload(token);
extract(token);
for (const name of [zipName, "hi.zip", "hi.txt", "deploy-test.txt"]) remove(token, name);
fs.rmSync(zipPath, { force: true });
fs.rmSync(cookie, { force: true });
console.log("DEPLOY_OK");
