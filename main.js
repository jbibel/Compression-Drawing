// main.js

// Modules to control application life and create native browser window
const {app, BrowserWindow, session, dialog, ipcMain} = require('electron')

let mainWindow = null
// const request = require('request')

// const electronify = require('electronify-server');
var server = require('./server.js')

// Live reload module which watches `public` folder
// const _ = require('electron-reload')(__dirname + '/public')

const path = require('path')
const url = require('url')

const fs = require('fs')
// var mainDir = app.getPath('desktop')
// var mainDirName = 'testing'

// console.log(path.join(mainDir,mainDirName))

// if (!fs.existsSync(mainDir)){
  //   fs.mkdir(path.join(mainDir,'testing'),
  //   { recursive: true }, (err) => {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log('Directory created successfully!');
  // });



const createWindow = () => {
  const { screen } = require('electron')

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  // console.log(width + ", " + height)

  // fs.mkdir(path.join(app.getAppPath(),"1NEW1"))
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 750,
    maxWidth: width,
    maxHeight: height,
    minWidth: 1280,
    minHeight: 750,
    useContentSize: true ,   // when false, width/height will set the size of the whole app, including frames. If true, innerWindow will be set instead, resulting in a bigger app window
    fullscreenable: false,
    title: "Compression Drawing BETA",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }



  })

  // console.log(app.getAppPath()+" yes");
  // console.log("Hi");

  // original
  // mainWindow.webContents.session.on("will-download", function(event, item, webContents) {
  //   item.setSavePath(__dirname+`/public/${item.getFilename()}`);
  // })



  // Load the index.html of the app
  mainWindow.loadURL(url.format({
    // pathname: path.join(__dirname, 'public', 'index.html'),
    pathname: path.join(__dirname, 'public', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  var trying = 0

  ipcMain.on('hey-open-my-dialog-now', () => {
    // dialog.showOpenDialog({properties: ['openFile', 'openDirectory']})

    dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths[0])
      trying = result.filePaths
      mainWindow.webContents.session.on("will-download", function(event, item, webContents) {
        item.setSavePath(path.join(trying[0],`${item.getFilename()}`));
    });
      // console.log(trying + "/wowow")
    }).catch(err => {
      console.log(err)
    })
    trying = 0
  });



  mainWindow.webContents.session.on("will-download", function(event, item, webContents) {
    item.setSavePath(__dirname+`/public/images/canvas/${item.getFilename()}`);
    // item.setSavePath(mainDir+`/testing/images/canvas/${item.getFilename()}`);
});





  // and load the index.html of the app.
  // mainWindow.loadFile('public/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  createWindow()

  // app.on('activate', () => {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })
})

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
