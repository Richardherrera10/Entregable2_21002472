var formulario = document.getElementById("formInicio");
var enviarCreds = document.querySelector("#iniciarSesion");
var nombre = document.querySelector("#idUsuario")
var contra = document.querySelector("#contraseña")
var correcto = true;
enviarCreds.addEventListener("click", (event, args) =>{
    event.preventDefault();
    console.log("Se hizo click");
    console.log(nombre.value);
    console.log(contra.value);

    if (correcto){
        window.abrir.idValido()
    }
}) 


