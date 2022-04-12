// interfaz
const{ipcRenderer, contextBridge, ipcMain, Notification} = require("electron")

//api
contextBridge.exposeInMainWorld(
    "DatosProductos",
    {
        //pedir datos de ventana de tabla -> main
        consultarProductos: () => ipcRenderer.send("consultarProductos", ),
        //datos productos main -> tabla 
     
        recibirProductos: (callback) => ipcRenderer.on("recibirProductos", callback),

        enviarProductos: (datos) => ipcRenderer.send("enviarProductos",datos),
        pedidos: (datos) => ipcRenderer.send("pedidos",datos),
    }

)