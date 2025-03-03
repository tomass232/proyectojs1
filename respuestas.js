import { getInfo } from "./services/llamados.js"
const contenedor = document.getElementById("contenedor")
async function getRespuestas() {
    let respuestas = await getData("respuestas")
    console.log(respuestas);
    respuestas.forEach(respuesta=> {
        const tituloPregunta=document.createElement("h2")
        const textoRespuesta=document.createElement("p")
        tituloPregunta.textContent=respuesta.pregunta
        textoRespuesta.textContent=respuesta.respuesta
        contenedor.appendChild(tituloPregunta)
        contenedor.appendChild(textoRespuesta)
    });
}
getRespuestas()