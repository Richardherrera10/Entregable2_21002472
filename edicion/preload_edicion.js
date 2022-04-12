// interfaz
const{ipcRenderer, contextBridge, ipcMain, Notification} = require("electron")

//api
contextBridge.exposeInMainWorld(
    "edicionProductos",
    {
        //recibirProductosNuevos
        prodAEditar: (callback) => ipcRenderer.on("prodAEditar", callback),

        //enviarProductoEditado 
        enviarNuevo: (datosNuevo) => ipcRenderer.send("enviarNuevo", datosNuevo)
    }

)
