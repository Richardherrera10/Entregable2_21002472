const {app, BrowserWindow, ipcMain, Notification, webContents, getCurrentWindow} = require('electron');
const path = require('path')
const mysql = require('mysql2/promise');
const { Console } = require('console');
const electron = require('electron')

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

let ventana;
//inicio de sesion
function createWindow(){
    ventana = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences:{
            preload: path.join(app.getAppPath(), "inicioSesion/preload_inicio.js")
        }
    });
    ventana.loadFile("inicioSesion/index.html")
}

ipcMain.on("datosUsuario", function(event, args){

    //callback a los datos empleado con funcion anonima y llamandola
    (async () => {
        let datos
        datos = (await consultar(args))
        if (datos.length  != 0){
            console.log("Correcto")
            createWindow2()
            ventana.close()
        } else {
            console.log("incorrecto")
            ventana.webContents.send("datosIncorrectos",args)
        }
    })()
})

//consultar datos empleado escritos en base de datos
async function consultar(empleado) {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '3v@ng3l10nE', database: 'tienda'});
    //sha2 para hash
    const [rows] = await connection.execute( "SELECT * FROM empleado WHERE idUsuario = ? AND contrasena = sha2(?, 224)", [empleado.nombre, empleado.contra]);
    return rows
}

//tabla productos
let ventana2;
function createWindow2(){
    ventana2 = new BrowserWindow({
 
        fullscreen: true,
        webPreferences:{
            preload: path.join(app.getAppPath(), "productos/preload_productos.js")
        }
    });
    ventana2.loadFile("productos/listaProductos.html")
}

ipcMain.on("consultarProductos", function(event, args){
    console.log("Se leyeron productos")
     //callback a los datos empleado con funcion anonima y llamandola
    console.log("Consultar productos");

    (async function() {
        let datosProductos
        datosProductos = await leerProductos()
        console.log(datosProductos)
        ventana2.webContents.on("did-finish-load", function(){
            ventana2.webContents.send("recibirProductos",datosProductos)
        })
    })();


})


//seleccionar todos los productos
async function leerProductos() {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '3v@ng3l10nE', database: 'tienda'});
    const [rows] = await connection.execute( "SELECT * FROM productos")
    return rows

}
//editar info productos
var ventana3;
function createWindow3(){
    ventana3 = new BrowserWindow({
        height: 800,
        width: 500,
      
        webPreferences:{
            preload: path.join(app.getAppPath(), "edicion/preload_edicion.js")
        }
    });   
    ventana3.loadFile("edicion/editarInfo.html")
   
}


//de productos a editar
ipcMain.on("enviarProductos", function(event, args){
    console.log("archivos a enviar")
    console.log(args)
    createWindow3()
    ventana3.webContents.on("did-finish-load", function(){
      
       ventana3.webContents.send("prodAEditar", args)
    })
})

//recibir info producto editado
ipcMain.on("enviarNuevo", function(event, args){
    console.log("Producto editado es")
    console.log(args);
    
    (async function() {
        let prodNuevo
        prodNuevo = await updateProductos(args);
        if (prodNuevo.length  != 0){
            ventana3.close();
            cargarNuevosDatos()
        }
    })();
})
async function updateProductos(productoNuevo) {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '3v@ng3l10nE', database: 'tienda'});
    const [rows] = await connection.execute( "UPDATE productos SET nombreProducto = ?, Descripcion = ?, Categoria = ?, existenciaInventario =? " +
    "WHERE codProducto = ?", [productoNuevo.nombreN, productoNuevo.descripcionN, productoNuevo.categoriaN, productoNuevo.existenciaN, productoNuevo.codigo])
    return rows
}
async function cargarNuevosDatos(){
    nuevosDatos = await leerProductos()
    console.log("Nuevos")
    console.log(nuevosDatos)
    ventana2.close()
    createWindow2()
}

var ventana4;
function createWindow4(){
    ventana4 = new BrowserWindow({
        height: 800,
        width: 500,
        webPreferences:{
            preload: path.join(app.getAppPath(), "pedidos/preload_pedidos.js")
        }
    });
    ventana4.loadFile("pedidos/pedidos.html")
}

ipcMain.on("pedidos", function(events, args){
    console.log("abrir pedidos")
    console.log(args)
    createWindow4();
    (async function() {
        let datosPedidos
        datosPedidos = await conseguirProv(args);
        console.log("proveedores disponibles son")
        console.log(datosPedidos)

        ventana4.webContents.on("did-finish-load", function(){
            ventana4.webContents.send("prodAPedir", datosPedidos)
        })
    })();
})

async function conseguirProv(productoPedir){
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '3v@ng3l10nE', database: 'tienda'});
    const [rows] = await connection.execute( " SELECT prod.codProducto, prod.nombreProducto, prov.codProvedor, prov.nombre FROM  productos AS prod, proveedores AS prov " + 
    " WHERE prod.grupoProv = prov.circuloProv AND prod.codProducto = ? ORDER BY prod.nombreProducto;" , 
    [productoPedir.codigo])
    return rows
}

//mandar pedido a base de datos
ipcMain.on("enviarPedido", function(event, args){
    console.log("Pedido a enviar es")
    console.log(args)
   hacerPedido(args)
})

async function hacerPedido(pedido){
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: '3v@ng3l10nE', database: 'tienda'});
    const [rows] = await connection.execute( "INSERT INTO pedidos(nombreProducto, codProducto, nombreProvedor, codProvedor, cantidadPedir,fecha) values(?,?,?,?,?,?)",
                                            [pedido.nombreProducto, pedido.codProducto, pedido.nombreProv, pedido.codProveedor, pedido.cantidadPedir, pedido.fecha])
    return rows
}
app.whenReady().then(createWindow)