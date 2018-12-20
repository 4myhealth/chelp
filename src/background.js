import {
  app, protocol, BrowserWindow, Menu, Tray, nativeImage,
} from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';


log.info('---------------- STARTING PROGRAMM ----------------');

const iconPath = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjBBNDBFRkFCOTg5MTFFOEI2NzY5NDMzRDlDNEU4N0EiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjBBNDBFRjlCOTg5MTFFOEI2NzY5NDMzRDlDNEU4N0EiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjZEOUVFRjczOEMxMUU4ODdCN0I0NTk2OTNENDlGMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjZEOUVGMDczOEMxMUU4ODdCN0I0NTk2OTNENDlGMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PscZrv4AAAJtSURBVHjalFNbSBRRGP7+M+O0q6tmFy+BYrfNriD0WGT04kssVi8SQRforSJ660l6ih6SLlAgLIQYUVHgQ0ZBiNlDEGQaubnuStQWKLU67rrrXM7pn50Fl8TAA2fmzH/5/u/7/zOklIIz9eh4fujGFZmZCBPlDDUrIRpbULb7DEACdqwP7tQIRLUAELQoFJ4IHLp6U28+8ZTsby+PZqLt/aQBogZQGX437UdF53sQeQls4519chgyPgiqAmSabS4QOjsQofnebeNucrJFbOQoh50mO84NQas/iNLl/hlDpmcfRJA/yjhuBtC3bI8JNTfZJNaxUfqlyOAdrMe/iwK1BV+BDsd6OXI23iiUZxDFKJahcsDiyO1lANboHah5PuhFQOHX0/nkghjS9el7gPmBu4C9AKP1QgHdGr2P/Kt7EAGvKlsqOa6sgOLqheoL7LBYWmsH9OZ2yNRbWB+isD9HOYj9Nvf+yGloTW2wky9gf3zslQYYiOa6ycSiqgxEHsJo6VzibOe4cV+5iIBYv4fLiiU5iX7kn0c8cvNId8HMDV9Sq12LY7dU+hpMQUzD2HsRq13GzvMQG4JMLFTOY6stGGVuBsoyV0xSdgYq/7s4Bg20JsQqlNCgpK8t1gsnNbgigPNzGNb4A/9Dcmdd2+uMVJCOD+oNl+g/xFVx89PL4Q4LUb0jBWfBByivA1VsWjGdyhtYbl1xShmIteEfZH1/3eFOf3omqnbBnX7Dl6QZesOBkqziFWVmzq93UGYcen073GwCWk34GHm/s/Wl52R++PplmU1u5ThtmQgqFUEuBTcnAm1d3Ub4VN9fAQYAWN8aBZrjcawAAAAASUVORK5CYII=';
let systrayMenu = null;
let forceQuit = false;
let appIcon = null;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });

autoUpdater.on('update-downloaded', (info) => {
  forceQuit = true;
  autoUpdater.quitAndInstall();
});

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });
  if (isDevelopment || process.env.IS_TEST) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  const template = [
    {
      label: app.getName(),
      submenu: [
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // Systray Menu to restore window
  systrayMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        win.show();
      },
    },
    {
      label: 'Quit',
      click: () => {
        forceQuit = true;
        app.quit();
      },
    },
  ]);

  appIcon = new Tray(nativeImage.createFromDataURL(iconPath)); // create systray
  appIcon.setToolTip('4myHealth-chelper'); // create systray tooltip
  appIcon.setContextMenu(systrayMenu);

  win.on('close', (event) => {
    if (!forceQuit) {
      event.preventDefault();
      win.hide();
      return false;
    }
    return true;
  });

  win.on('minimize', (event) => {
    forceQuit = false;
    event.preventDefault();
    win.hide();
  });
}


// Quit when all windows are closed.
/* app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
*/
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
