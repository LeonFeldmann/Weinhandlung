const { remote } = require('electron');

const { BrowserWindow } = remote;

function loginUser() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./src/mainWindow.html');
  remote.getCurrentWindow().close();
}
