// interfaz
const{ipcRenderer, contextBridge, ipcMain, Notification} = require("electron")

//api
contextBridge.exposeInMainWorld(
    "pedidoProductos",
    {
        //recibirProductosNuevos
        prodAPedir: (callback) => ipcRenderer.on("prodAPedir", callback),

        //enviarProductoEditado 
        enviarPedido: (datosPedido) => ipcRenderer.send("enviarPedido", datosPedido)
    }

)
