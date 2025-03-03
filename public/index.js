import {getData} from "./servicios/llamados.js"
const nombreUsuario = document.getElementById("nombreUsuario")
const password = document.getElementById("password")
const btIniciarSesion = document.getElementById("btIniciarSesion")

btIniciarSesion.addEventListener("click", async function(){
    let data = await getData("usuarios")
    const usuarioValido = data.find((usuario) => usuario.nombreUsuario === nombreUsuario.value && usuario.claveUsuario === password.value && usuario.rolUsuario==="estudiante")
    const usuarioValidoAdmin = data.find((usuario) => usuario.nombreUsuario === nombreUsuario.value && usuario.claveUsuario === password.value && usuario.rolUsuario==="admin")
    if(usuarioValido){
        window.location.href = "estudiantes.html"
        localStorage.setItem("usuario",usuarioValido.nombreUsuario)
    }else if(usuarioValidoAdmin){
        window.location.href = "admin.html"
    }
})