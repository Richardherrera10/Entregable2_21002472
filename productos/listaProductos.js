var tabla = document.getElementById('tablaProductos');
window.DatosProductos.consultarProductos()
window.DatosProductos.recibirProductos(function(event, args){
  console.log(args)
  console.log("separado")
  for (let i =0; i<args.length; i++){
    
    let fila = document.createElement('tr')

    fila.innerHTML += `<tr>
        <td class="codigo"> ${args[i].codProducto}</td>
        <td class="nombre"> ${args[i].nombreProducto}</td>
        <td class="descripcion"> ${args[i].Descripcion}</td>
        <td class="categoria"> ${args[i].Categoria}</td>
        <td class="cantidad">${args[i].existenciaInventario}</td>
        <td> <button type = "button" class="editar"> Editar </button> </td>
        <td> <button type = "button" class="Solicitud"> Solicitud </button> </td>
        </tr>`
    
    tabla.appendChild(fila)
    
  }
}) 

tabla.addEventListener("click", async (e) =>{

  var button = e.target;
  console.log(button)
  var cell = button.parentNode;
  console.log(cell)
  var row = cell.parentNode;    
  console.log(row)
let producto = {
  codigo: row.querySelector('.codigo').innerHTML.trim(),
  nombre: nombre = row.querySelector(".nombre").innerHTML.trim(),
  descripcion: row.querySelector(".descripcion").innerHTML.trim(),
  categoria: row.querySelector(".categoria").innerHTML.trim(),
  existencia: row.querySelector(".cantidad").innerHTML.trim()
}

console.log("Detalle producto")
console.log(producto)

console.log(producto.codigo)
console.log(producto.nombre)
  //al revez por la lógica
if (!e.target.matches('.editar')){
  //para solicitud
  console.log("se clickeo solicitud")
  window.DatosProductos.pedidos(producto)
  console.log("paso")

} 
else if(!e.target.matches('.Solicitud')){
  // para editar
  console.log("se clickeo editar")
  console.log("productos antes de enviar")
  console.log(producto)
 window.DatosProductos.enviarProductos(producto)
  
}
})