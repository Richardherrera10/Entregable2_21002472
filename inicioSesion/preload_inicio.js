// interfaz
const{ipcRenderer, contextBridge, ipcMain, Notification} = require("electron")

//api
contextBridge.exposeInMainWorld(
    "iniciarSesion",
    {
        //enviar datos index -> main
        datosUsuario: (datos) => ipcRenderer.send("datosUsuario", datos),

        //datos incorrectos mensaje de main -> index
        datosIncorrectos: (callback) => ipcRenderer.on("datosIncorrectos", callback),




        
    }

)