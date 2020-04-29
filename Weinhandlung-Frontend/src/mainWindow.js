$(document).ready(() => {
  $('#currentViewContent').load('./views/verkaufslisteView.html');
});

const { remote } = require('electron');

const { BrowserWindow } = remote;

const apiServerAddress = 'http://localhost:3003';

/**
 * Functions that load the different views into the View Container.
 * They manage the navigation of the application.
 */
function loadVerkaufslisteView() {
  $('a').removeClass('active');
  $(event.target).addClass('active');
  $('#currentViewContent').load('./views/verkaufslisteView.html');
}

function loadWineView() {
  $('a').removeClass('active');
  $(event.target).addClass('active');
  $('#currentViewContent').load('./views/wineView.html');
}

function loadCustomerView() {
  $('a').removeClass('active');
  $(event.target).addClass('active');
  $('#currentViewContent').load('./views/customerView.html');
}

function loadWinzerView() {
  $('a').removeClass('active');
  $(event.target).addClass('active');
  $('#currentViewContent').load('./views/winzerView.html');
}

/**
 * Function that loads the login Window.
 */
function logoutUser() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./src/loginWindow.html');
  remote.getCurrentWindow().close();
}

function loadBackupView() {
  $('#currentViewContent').load('./views/datensicherungView.html');
}
