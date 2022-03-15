const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path")
let ventana;
function createWindow(){
    ventana = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences:{
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    ventana.loadFile("index.html")
}

let ventana2;
function createWindow2(){
    ventana = new BrowserWindow({
 
        fullscreen: true,
        webPreferences:{
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    ventana.loadFile("listaProductos.html")
}

ipcMain.on("idValido", function(event, args){
  
    createWindow2()

})

var ventana3;
function createWindow3(){
    ventana = new BrowserWindow({
        height: 800,
        width: 500,
      
        webPreferences:{
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    
    
    ventana.loadFile("editarInfo.html")
   
}


//de productos a editar
ipcMain.on("editarInfo", function(event, args){
    console.log(args)
    createWindow3()
    ventana.webContents.on("did-finish-load", function(){
      
        ventana.webContents.send("recibirInfo", args)
    })
})

//de editar a productos
ipcMain.on("nuevaInfo", function(event, args){
    console.log(args)
    createWindow2()
    ventana.webContents.on("did-finish-load", function(){
      
        ventana.webContents.send("recibirNuevo", args)
    })
})
var ventana4;
function createWindow4(){
    ventana = new BrowserWindow({
        height: 800,
        width: 500,
      
        webPreferences:{
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    ventana.loadFile("pedidos.html")
}
ipcMain.on("nuevoPedido", function(event, args){
    createWindow4()
    ventana.webContents.on("did-finish-load", function(){
      
        ventana.webContents.send("recibirPedido", args)
    })
})


app.whenReady().then(createWindow)