const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

const debug = true;

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

        icon: './resources/app.ico',
        frame: false,
        
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: debug,
        },
    })
    
    mainWindow.loadFile('./template/index.html')
    
    mainWindow.on('closed', e => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()

    if (!debug) globalShortcut.registerAll(['ctrl+R','ctrl+W','ctrl+shift+R', 'ctrl+shift+=', 'F11'], () => {})
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    globalShortcut.unregisterAll()

    if (process.platform !== 'darwin') app.quit()
})

app.on('browser-window-focus', () => {
    if (!debug) globalShortcut.registerAll(['ctrl+R','ctrl+W','ctrl+shift+R', 'ctrl+shift+=', 'F11'], () => {})
})

app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
})


ipcMain.handle('window-control', async (event, type) => {
    try {
        switch (type) {
            case 'close':
                mainWindow.removeAllListeners()
                mainWindow.close()
                return {status: 'success', 'message': 'successfully closed window'}
            
            case 'minimize':
                mainWindow.minimize()
                return {status: 'success', 'message': 'successfully minimized window'}
    
            default:
                return {status: 'not found', 'message': 'your command is not registerd'}
        }
    } catch (error) {
        return {status: 'error', message: 'oops something went wrong! pls report to support'}
    }
}) 


// db
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

db.serialize(() => {
    db.run("CREATE TABLE if not exists DNS_DATABASE (id integer, dns_name text, dns1 text, dns2 text)");

    db.all('SELECT * FROM DNS_DATABASE ORDER BY id DESC LIMIT 1', (err, rows) => {
        if (rows && typeof rows === 'object') if (rows.length === 0) {
            db.run("INSERT INTO DNS_DATABASE VALUES (1, 'Google', '8.8.8.8', '8.4.4.8')")
            db.run("INSERT INTO DNS_DATABASE VALUES (2, 'Cloudflare', '1.1.1.1', '1.0.0.1')")
            db.run("INSERT INTO DNS_DATABASE VALUES (3, 'Quad9', '9.9.9.9', '149.112.112.112')")
            db.run("INSERT INTO DNS_DATABASE VALUES (4, 'OpenDNS', '208.67.222.222', '208.67.220.220')")
            db.run("INSERT INTO DNS_DATABASE VALUES (5, 'shecan.ir', '178.22.122.100', '185.51.200.2')")

            db.close();
        }
    })
})

