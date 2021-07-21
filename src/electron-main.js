const {app, BrowserWindow} = require('electron')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        icon: './static/img/00.ico',
        frame: false,
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    mainWindow.loadFile('./template/index.html')

}

app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
