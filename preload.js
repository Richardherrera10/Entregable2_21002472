// interfaz
const{ipcRenderer, contextBridge} = require("electron")

//api
contextBridge.exposeInMainWorld(
    "abrir",
    {
        //enviando
        idValido: (datos) => ipcRenderer.send("idValido", datos),

        // productos -> main -> editarInfo
        editarInfo: (producto) => ipcRenderer.send("editarInfo", producto),
        recibirInfo: (datosProd)=> ipcRenderer.on("recibirInfo", datosProd),


        // editarInfo -> main -> productos
        nuevaInfo: (nuevoProd)=> ipcRenderer.send("nuevaInfo", nuevoProd),
        recibirNuevo: (recibir)=> ipcRenderer.send("recibirNuevo", recibir),


        // productos -> main -> pedidos
        nuevoPedido: (pedido) => ipcRenderer.send("nuevoPedido", pedido),
        recibirPedido: (datospedido) => ipcRenderer.on("recibirPedido", datospedido),



        // con invoke - handle 
        comunicarPedidosEditar: async (arg) => {
            return await ipcRenderer.invoke('informacionProd', arg);
        }, 
        recibirNuevo2: async (arg) => {
            ipcRenderer.sendTo("recibirNuevo2",arg)
        }
        
    }

)