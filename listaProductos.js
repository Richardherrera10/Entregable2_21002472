
 var tabla = document.getElementById('tablaProductos');
tabla.addEventListener("click", async (e) =>{
  var button = e.target;
  var cell = button.parentNode;
  console.log(cell)
  var row = cell.parentNode;    
  console.log(row)


  var codigo = row.querySelector('.codigo').innerHTML;
  console.log(codigo)
  var nombre = row.querySelector(".nombre").innerHTML;
  console.log(nombre)
  var descripcion = row.querySelector(".descripcion").innerHTML;
  console.log(descripcion)
  var categoria = row.querySelector(".categoria").innerHTML;
  console.log(categoria)
  var cantidad = row.querySelector(".cantidad").innerHTML;
  console.log(cantidad)

var producto = [codigo, nombre, descripcion, categoria, cantidad];
console.log("Detalle producto")
console.log(producto)

  //al revez por la lógica
if (!e.target.matches('.editar')){
  //para solicitud
  console.log("se clickeco solicitud")

  window.abrir.nuevoPedido(producto);

} 
else if(!e.target.matches('.Solicitud')){
  // para editar
  console.log("se clickeo editar")
  window.abrir.editarInfo(producto);
console.log( e.target.textContent) 
}
})




/* // verdadera tabla
 tabla.onclick = e =>
  {
    var button = e.target;
    var cell = button.parentNode;
    console.log(cell)
    var row = cell.parentNode;    
    console.log(row)


    var codigo = row.querySelector('.codigo').innerHTML;
    console.log(codigo)
    var nombre = row.querySelector(".nombre").innerHTML;
    console.log(nombre)
    var descripcion = row.querySelector(".descripcion").innerHTML;
    console.log(descripcion)
    var categoria = row.querySelector(".categoria").innerHTML;
    console.log(categoria)
    var cantidad = row.querySelector(".cantidad").innerHTML;
    console.log(cantidad)

var producto = [codigo, nombre, descripcion, categoria, cantidad];
console.log("Detalle producto")
console.log(producto)

    //al revez por la lógica
  if (!e.target.matches('.editar')){
    //para solicitud


    //window.abrir.nuevoPedido(producto);
  
  } 
  else if(!e.target.matches('.Solicitud')){
    // para editar
    console.log("El producto")
    (async () => {
      console.log("El producto")
      console.log(producto)
        const productoEnviar = await window.abrir.comunicarPedidosEditar(producto)
    })

/*     window.abrir.editarInfo(producto);
  console.log( e.target.textContent)  */

//termina verdadera tabla */