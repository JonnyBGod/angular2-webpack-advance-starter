process.env.NODE_ENV = process.env.NODE_ENV || 'production';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// electron
const electron: any = require('electron');
const app: any = electron.app;
const eMenu: any = electron.Menu;
const shell: any = electron.shell;
// const crashReporter: any = electron.crashReporter;
const browserWindow: any = electron.BrowserWindow;
let mainWindow: any = undefined;
let template: any;
let menu: any;

// app
import { DesktopConfig } from 'shared/electron/index';

/*crashReporter.start({
  productName: 'Angular2WebpackAdvanceStarter',
  companyName: 'JonnyBGod',
  submitURL: 'https://github.com/JonnyBGod/angular2-webpack-advance-starter',
  autoSubmit: true
});*/

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {

  // Tell Electron where to load the entry point from
  if (process.env.NODE_ENV === 'development') {
    // Initialize the window to our specified dimensions
    mainWindow = new browserWindow({
      width: 900,
      height: 620,
      webPreferences: {
        preload: __dirname + '/../src/assets/preloadDesktop.js'
      }
    });

    mainWindow.loadURL('http://localhost:3000/');
  } else {
    // Initialize the window to our specified dimensions
    mainWindow = new browserWindow({ width: 900, height: 620 });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }

  // Clear out the main window when the app is closed
  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  mainWindow.webContents.on('did-navigate-in-page', (e: any, url: string) => {
    console.log(`Page navigated: ${url}`);
  });

  let appTitle: string = `Angular 2 Webpack Advance Starter`;

  let langMenu: any = {
    label: 'Language',
    submenu: []
  };
  for (let lang of DesktopConfig.SUPPORTED_LANGUAGES) {
    let code = lang.code;
    let langOption = {
      label: lang.title,
      click: () => {
        console.log(`Change lang: ${code}`);
        mainWindow.webContents
          .executeJavaScript(
            `window.dispatchEvent(new CustomEvent('changeLang', {detail: { value: '${code}'} }));`
          );
      }
    };
    langMenu.submenu.push(langOption);
  }

  let helpMenu: any = {
    label: 'Help',
    submenu: [{
      label: 'Learn More',
      click: () => {
        shell.openExternal('https://github.com/JonnyBGod/angular2-webpack-advance-starter');
      }
    }, {
        label: 'Issues',
        click: () => {
          shell.openExternal(
            'https://github.com/JonnyBGod/angular2-webpack-advance-starter/issues'
          );
        }
      }, {
        label: `My Amazing Parent: Minko Gechev's Angular 2 Seed`,
        click: () => {
          shell.openExternal('https://github.com/mgechev/angular2-seed');
        }
      }, {
        label: 'Angular 2',
        click: () => {
          shell.openExternal('https://angular.io/');
        }
      }, {
        label: 'Electron',
        click: () => {
          shell.openExternal('http://electron.atom.io/');
        }
      }, {
        label: 'Electron Docs',
        click: () => {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs');
        }
      }, {
        label: 'Codeology Visualization',
        click: () => {
          shell.openExternal(
            'http://codeology.braintreepayments.com/JonnyBGod/angular2-webpack-advance-starter'
          );
        }
      }]
  };

  if (process.platform === 'darwin') {
    template = [{
      label: appTitle,
      submenu: [{
        label: `About ${appTitle}`,
        selector: 'orderFrontStandardAboutPanel:'
      }, {
          type: 'separator'
        }, {
          label: 'Services',
          submenu: []
        }, {
          type: 'separator'
        }, {
          label: 'Hide Angular 2 Seed Advanced',
          accelerator: 'Command+H',
          selector: 'hide:'
        }, {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        }, {
          label: 'Show All',
          selector: 'unhideAllApplications:'
        }, {
          type: 'separator'
        }, {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }]
    }, {
        label: 'Edit',
        submenu: [{
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        }, {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          }, {
            type: 'separator'
          }, {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          }, {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          }, {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          }, {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }]
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development') ? [{
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            mainWindow.restart();
          }
        }, {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: () => {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: () => {
              mainWindow.toggleDevTools();
            }
          }] : [{
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: () => {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }]
      }, {
        label: 'Window',
        submenu: [{
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          }, {
            type: 'separator'
          }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }]
      },
      langMenu,
      helpMenu];

    menu = eMenu.buildFromTemplate(template);
    eMenu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
          label: '&Close',
          accelerator: 'Ctrl+W',
          click: () => {
            mainWindow.close();
          }
        }]
    }, {
        label: '&View',
        submenu: (process.env.NODE_ENV === 'development') ? [{
          label: '&Reload',
          accelerator: 'Ctrl+R',
          click: () => {
            mainWindow.restart();
          }
        }, {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: () => {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: () => {
              mainWindow.toggleDevTools();
            }
          }] : [{
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: () => {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }]
      },
      langMenu,
      helpMenu];
    menu = eMenu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }

});
