// @ts-check
"use strict";

const { join } = require("path");
const { writeFile } = require("fs-extra");
const { spawn } = require("child_process");
const createPackage = require("electron-packager");

(async () => {
	const src = join(__dirname, "src");
	const asciiflow = join(__dirname, "src/asciiflow");

	await exec("bash", ["compile.sh"], { cwd: asciiflow });
	await writeFile(join(src, "package.json"), JSON.stringify({
		name: "asciiflow2",
		main: "./index.js"
	}));
	await createPackage({
		dir: src,
		out: join(__dirname, "packages"),
		asar: true,

		// TODO: Convert icon to .ico on win32 platforms:
		icon: join(asciiflow, "images/favicon.png")
	});

})().catch(error => {
	console.error(error);
	process.exit(1);
});

function exec(command, argv, options = { }) {
	return new Promise((resolve, reject) => {
		const proc = spawn(command, argv, {
			cwd: options.cwd || process.cwd(),
			stdio: "inherit"
		});
		proc.on("error", reject);
		proc.on("exit", (code, signal) => {
			if (code || signal) {
				reject(code || signal);
			} else {
				resolve();
			}
		});
	});
}
