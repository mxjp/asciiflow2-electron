"use strict";

const { join } = require("path");
const { app, BrowserWindow } = require("electron");

app.once("ready", () => {
	const window = new BrowserWindow({
		width: 1280,
		height: 720,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			partition: "asciiflow2"
		},
		show: false
	});
	window.on("ready-to-show", () => {
		window.show();
	});
	window.on("closed", () => {
		app.exit();
	});
	window.loadFile(join(__dirname, "asciiflow/index.html"));
});
