window.abrir.recibirPedido(function(event,args){
    var producto = args;
    console.log("Lista prods")
    console.log(producto);
    

    var codigo = document.getElementById("codigo");
    codigo.value = producto[0]
    console.log(codigo)

    var nombre = document.getElementById("nombre");
    nombre.value=producto[1]

})
