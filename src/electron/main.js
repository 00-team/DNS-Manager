const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1000,
        minWidth: 1000,
        maxWidth: 1000,

        height: 600,
        minHeight: 600,
        maxHeight: 600,

        icon: './static/img/00.ico',
        frame: false,
        
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    
    mainWindow.loadFile('./template/index.html')
    
    mainWindow.on('closed', e => {
        mainWindow = null
    })
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


ipcMain.handle('close-window', async (event, args) => {
    try {
        mainWindow.removeAllListeners()
        mainWindow.close()

        return {'success': 'successfully closed window'}
    } catch (error) {
        return {'error': error.message}
    }
})