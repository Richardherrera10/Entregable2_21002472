let confirmar = document.getElementById("confirmar")
let combobox = document.getElementById("proveedores")
var proveedores = []
const format1 = "YYYY-MM-DD HH:mm:ss"
window.pedidoProductos.prodAPedir(function(event,args){
    
    var codigo = document.getElementById("codigo");
    codigo.value = args[0].codProducto
    

    var nombre = document.getElementById("nombre");
    nombre.value=args[0].nombreProducto

    for (let i =0; i < args.length; i++){
        console.log(args[i].nombre)
        let proveedor = document.createElement("option")
        proveedor.innerHTML += `${args[i].nombre} `
        combobox.appendChild(proveedor)

        proveedores.push({
            nombreProv: args[i].nombre,
            codProv: args[i].codProvedor
        })
    }
    console.log(proveedores)

})

//mandar pedido a base de datos
confirmar.addEventListener("click", (e) =>{
    e.preventDefault();
    let cant = document.getElementById("Cantidad")
  

    let codigoProveedor
    //conseguir el nombre y codigo de proveedor 
    for (let i = 0; i< proveedores.length; i++){
        if (proveedores[i].nombreProv === combobox.value){
            codigoProveedor = proveedores[i].codProv
            break;
        }
    }
    var fecha = new Date();
    datetime = moment(fecha).format(format1)
    let pedido = {
        codProducto: codigo.value,
        nombreProducto: nombre.value,
        codProveedor: codigoProveedor,
        nombreProv: combobox.value,
        cantidadPedir: cant.value,
        fecha: datetime
    }
    document.getElementById("hecho").style.visibility = "visible";


    if (pedido.cantidadPedir === ""){
       
        document.getElementById("hecho").style.visibility = "visible";
        document.getElementById("hecho").innerHTML = "Escriba cantidad antes de continuar"
    } else{

        document.getElementById("hecho").innerHTML = "¡Pedido hecho! Puede cerrar la ventana";
        window.pedidoProductos.enviarPedido(pedido)
        
    }
  


})
