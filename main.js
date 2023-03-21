const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let ventana;

function createWindow() {
  ventana = new BrowserWindow({
    width: 1300,
    height: 1300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  ventana.loadFile("index.html");
}

app.whenReady().then(createWindow);
