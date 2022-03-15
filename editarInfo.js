window.abrir.recibirInfo(function(event,args){

    var producto = args;
    console.log("Lista prods")
    console.log(producto);
    

    var codigo = document.getElementById("codigo");
    codigo.value = producto[0]
    console.log(codigo)

    var nombre = document.getElementById("nombre");
    nombre.value=producto[1]

    var categoria = document.getElementById("categoria");
    categoria.value=producto[3]

    var descripcion = document.getElementById("descripcion");
    descripcion.value=producto[2]

    var existencia = document.getElementById("existencia");
    existencia.value=producto[4]

    
    
})
