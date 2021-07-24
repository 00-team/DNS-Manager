const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1000,
        minWidth: 1000,
        maxWidth: 1000,

        height: 600,
        minHeight: 600,
        maxHeight: 600,

        maximizable: false,

        icon: './build/icon/app.ico',
        frame: false,
        
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false,
        },
    })
    
    mainWindow.loadFile('./template/index.html')
    
    mainWindow.on('closed', e => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()

    globalShortcut.registerAll(['ctrl+R','ctrl+W','ctrl+shift+R', 'ctrl+shift+=', 'F11'], () => {})
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    globalShortcut.unregisterAll()

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


// db
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

db.run("CREATE TABLE if not exists saved_dns (id integer, name text, preferred_dns text, alternate_dns text)");
db.close();
