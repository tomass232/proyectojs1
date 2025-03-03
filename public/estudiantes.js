import { getData, postData } from "./servicios/llamados.js"

const nombre = document.getElementById("nombrecasila")
const descripcion = document.getElementById("descripcion")
const btnAggConsulta = document.getElementById("btnAggConsulta")
const lista = document.getElementById("lista")
nombrecasila.value = localStorage.getItem("usuario")

let fecha = new Date()

btnAggConsulta.addEventListener("click",async function() {
    let consulta ={
        "nombreUsuario":nombre.value,
        "descripcionConsulta": descripcion.value,
        "horaConsulta": fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()+":"+fecha.getMilliseconds(),
        "diaConsulta": fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear()
    }
    await postData(consulta,"consultas")

traerdatos()
})
async function traerdatos() {
    const datos = await getData("consultas")
    tablaDatos.textContent = ""
    const trGeneral = document.createElement("tr")
    const thNombreEstudiante = document.createElement("th")
    const thConsultaEstudiante = document.createElement("th")
    const thHoraConsulta = document.createElement("th")
    const thDiaConsulta = document.createElement("th")
   
    thNombreEstudiante.textContent = "Nombre del Estudiante"
    thConsultaEstudiante.textContent = "Consulta Estudiante"
    thHoraConsulta.textContent = "Hora Consulta"
    thDiaConsulta.textContent = "Día Consulta"

    trGeneral.appendChild(thNombreEstudiante)
    trGeneral.appendChild(thConsultaEstudiante)
    trGeneral.appendChild(thHoraConsulta)
    trGeneral.appendChild(thDiaConsulta)


    tablaDatos.appendChild(trGeneral)
    datos.forEach(dato => {
        const trDatos = document.createElement("tr")
        const tdNombre = document.createElement("td")
        const tdConsulta = document.createElement("td")
        const tdHora = document.createElement("td")
        const tdDia = document.createElement("td")
        trDatos.appendChild(tdNombre)
        trDatos.appendChild(tdConsulta)
        trDatos.appendChild(tdHora)
        trDatos.appendChild(tdDia)
        tdNombre.textContent = dato.nombreUsuario
        tdConsulta.textContent = dato.descripcionConsulta
        tdHora.textContent = dato.horaConsulta
        tdDia.textContent = dato.diaConsulta
        tablaDatos.appendChild(trDatos)
    })
}
traerdatos()


async function mostrarRespuestas() {
    const respuestas = await getData("respuestas")
    respuestas.forEach(dato => {
        const titulorespuesta = document.createElement("h1")
        const respuesta = document.createElement("p")
        const div = document.createElement("div")

        titulorespuesta.textContent = dato.pregunta
        respuesta.textContent = dato.respuesta
        
        div.appendChild(titulorespuesta)
        div.appendChild(respuesta)

        lista.appendChild(div)

    })
}
mostrarRespuestas()


