var formulario = document.getElementById("formInicio");
var enviarCreds = document.querySelector("#iniciarSesion");
var nombre = document.querySelector("#idUsuario")
var contra = document.querySelector("#contraseña")
var correcto = true


  
enviarCreds.addEventListener("click", (event, args) =>{
    event.preventDefault();
    document.getElementById("incorrecto").style.visibility = "hidden"
    let datos = {
        nombre : nombre.value,
        contra : contra.value
    }

    const re = new RegExp("[a-zA-Z]+[.][0-9]+")
    const reCon = new RegExp("[a-zA-Z]+[0-9]+")
    if (nombre.value.match(re) && contra.value.match(reCon)){
        console.log("Yes")
        document.getElementById("incorrecto").style.visibility = "hidden"
        window.iniciarSesion.datosUsuario(datos)
    }else if ( !nombre.value.match(re) && contra.value.match(reCon)  ) {
        console.log("no")
        document.getElementById("incorrecto").style.visibility = "visible"
        document.getElementById("incorrecto").innerHTML = "Usuario debe estar de la forma: (Primera letra apellido) + (nombre) . (usuario)"
    } else if ( nombre.value.match(re) && !contra.value.match(reCon)  ){
        console.log("no")
        document.getElementById("incorrecto").style.visibility = "visible"
        document.getElementById("incorrecto").innerHTML = "Contraseña debe estar de la forma: nombre + (numeros)"
    } else if ( !nombre.value.match(re) && !contra.value.match(reCon)   ){
        document.getElementById("incorrecto").style.visibility = "visible"
        document.getElementById("incorrecto").innerHTML = "Usuario y Contraseña mal formato"
    }
    console.log(datos)
    

}) 


window.iniciarSesion.datosIncorrectos(function(event, args){
    console.log(args)
    document.getElementById("incorrecto").style.visibility = "visible"
})