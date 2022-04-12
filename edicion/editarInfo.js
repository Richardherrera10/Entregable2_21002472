window.edicionProductos.prodAEditar(function(event,args){


    var codigo = document.getElementById("codigo");
    codigo.value = args.codigo
    console.log(codigo.value)

    var nombre = document.getElementById("nombre");
    nombre.value=args.nombre

    var categoria = document.getElementById("categoria");
    categoria.value=args.categoria

    var descripcion = document.getElementById("descripcion");
    descripcion.value=args.descripcion

    var existencia = document.getElementById("existencia");
    existencia.value=args.existencia
    
})

let botonEnviar = document.getElementById("submit")

botonEnviar.addEventListener("click",  (e) =>{

    e.preventDefault();
    let productoNuevo ={
        codigo: codigo.value,
        nombreN: nombre.value,
        categoriaN: categoria.value,
        descripcionN: descripcion.value,
        existenciaN: existencia.value
    }
    console.log(productoNuevo)

    window.edicionProductos.enviarNuevo(productoNuevo)
})