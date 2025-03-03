import { getData, postData } from "./servicios/llamados.js";

const fecha = new Date()
function agregarConsulta() {
    let nombre = document.getElementById("nombre").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    let fecha = new Date();
    let fechaHora = fecha.toLocaleString();

    if (nombre === "" || descripcion === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let nuevaConsulta = { nombre, descripcion, fechaHora };

    let consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    consultas.push(nuevaConsulta);
    localStorage.setItem("consultas", JSON.stringify(consultas));

    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
}
async function traerdatos() {
    const datos = await getData("consultas")
    tablaDatos.textContent = ""
    const trGeneral = document.createElement("tr")
    const thNombreEstudiante = document.createElement("th")
    const thConsultaEstudiante = document.createElement("th")
    const thHoraConsulta = document.createElement("th")
    const thDiaConsulta = document.createElement("th")
    const thRepuesta = document.createElement("th")
    thNombreEstudiante.textContent = "Nombre del Estudiante"
    thConsultaEstudiante.textContent = "Consulta Estudiante"
    thHoraConsulta.textContent = "Hora Consulta"
    thDiaConsulta.textContent = "Día Consulta"
    thRepuesta.textContent = "Responder"
     


    trGeneral.appendChild(thNombreEstudiante)
    trGeneral.appendChild(thConsultaEstudiante)
    trGeneral.appendChild(thHoraConsulta)
    trGeneral.appendChild(thDiaConsulta)
    trGeneral.appendChild(thRepuesta)


    tablaDatos.appendChild(trGeneral)
    

    datos.forEach(dato => {
        const trDatos = document.createElement("tr")
        const tdNombre = document.createElement("td")
        const tdConsulta = document.createElement("td")
        const tdHora = document.createElement("td")
        const tdDia = document.createElement("td")

        const btnRespuesta = document.createElement("button")
        btnRespuesta.textContent ="Respuesta"
        
        trDatos.appendChild(tdNombre)
        trDatos.appendChild(tdConsulta)
        trDatos.appendChild(tdHora)
        trDatos.appendChild(tdDia)
        trDatos.appendChild(btnRespuesta)
        
        btnRespuesta.addEventListener("click",function(){
            let inputRespuesta = document.createElement("input")
            let btnRespuesta = document.createElement("button")
            btnRespuesta.textContent = "Enviar Respuesta"

            thRepuesta.appendChild(inputRespuesta)
            thRepuesta.appendChild(btnRespuesta)

            btnRespuesta.addEventListener("click",async function(){
                let formatoRespuesta = {
                    "pregunta":dato.descripcionConsulta,
                    "respuesta":inputRespuesta.value,
                    "horaRespuesta": fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + ":" + fecha.getMilliseconds()
                }
                await postData(formatoRespuesta,"respuestas")
            })
        })

        tdNombre.textContent = dato.nombreUsuario
        tdConsulta.textContent = dato.descripcionConsulta
        tdHora.textContent = dato.horaConsulta
        tdDia.textContent = dato.diaConsulta
        tablaDatos.appendChild(trDatos)
    })
}
traerdatos()

//function cargarConsultas() {
  //  let consultas = JSON.parse(localStorage.getItem("consultas")) || [];
//    let lista = document.getElementById("listaConsultas");
//    lista.innerHTML = "";
//
//    consultas.forEach((consulta, index) => {
//        let div = document.createElement("div");
//        div.classList.add("consulta");
//        div.innerHTML = `<strong>${consulta.nombre}</strong> (${consulta.fechaHora}): <br> ${consulta.descripcion} 
//        <br><button onclick="eliminarConsulta(${index})">Eliminar</button>`;
//        lista.appendChild(div);
//    });
//}
//
//function eliminarConsulta(index) {
//    let consultas = JSON.parse(localStorage.getItem("consultas")) || [];
//    consultas.splice(index, 1);
//    localStorage.setItem("consultas", JSON.stringify(consultas));
//    cargarConsultas();
//}
