const preguntas = [
    {
        id:1,
        titulo:"¿Cómo se escribe?: ",
        img:"arbol.jpg",
        opcionA:"Arbol",
        opcionB:"Harbol",
        opcionC:"Árbol",
        opcionD:"Árvol",
        correcta:"C"
    },
    {
        id:2,
        titulo:"¿Cómo se escribe?:",
        img:"Alcohol2.png",
        opcionA:"Alcohol",
        opcionB:"Halcol",
        opcionC:"Alcohl",
        opcionD:"Alcól",
        correcta:"A"
    },
    {
        id:3,
        titulo:"¿Cómo se escribe?:",
        img:"Ahi.webp",
        opcionA:"Hay",
        opcionB:"Ahí",
        opcionC:"Áhi",
        opcionD:"Ay",
        correcta:"B"
    },
    {
        id:4,
        titulo:"¿Cómo se escribe?:",
        img:"no-te-vayas-chavo-chavo-del8.gif",
        opcionA:"Vallas",
        opcionB:"Bayas",
        opcionC:"Ballas",
        opcionD:"Vayas",
        correcta:"D"
    },
    {
        id:5,
        titulo:"¿Cómo se escribe?:",
        img:"Por Que.jfif",
        opcionA:"Porque",
        opcionB:"Por qué",
        opcionC:"Por Que",
        opcionD:"Porqué",
        correcta:"B"
    },
    {
        id:6,
        titulo:"¿Cómo se escribe?:",
        img:"cocina.webp",
        opcionA:"Cosina",
        opcionB:"Cócina",
        opcionC:"Cosiná",
        opcionD:"Cocina",
        correcta:"D"
    },
]
let numPreguntaActual = 0;
const PreguntaPiola = preguntas
function cargarSiguientePregunta(num){
    const numPregunta = document.querySelector("#num-Pregunta")
    const titulo = document.querySelector("#pregunta")
    const img = document.querySelector("#img")
    const opcionA = document.querySelector("#A")
    const opcionB = document.querySelector("#B")
    const opcionC = document.querySelector("#C")
    const opcionD = document.querySelector("#D")

    numPregunta.innerHTML = num + 1;
    txtpregunta.innerHTML = PreguntaPiola[num].titulo
    img.src = PreguntaPiola[num].img
    opcionA.innerHTML = PreguntaPiola[num].opcionA
    opcionB.innerHTML = PreguntaPiola[num].opcionB
    opcionC.innerHTML = PreguntaPiola[num].opcionC
    opcionD.innerHTML = PreguntaPiola[num].opcionD

    const botonesRespuesta = document.querySelectorAll(".opcion");

    botonesRespuesta.forEach(opcion=>{
        opcion.removeEventListener("click", (e)=>{})
        opcion.classList.remove("correcta");
        opcion.classList.remove("incorrecta");
        opcion.classList.remove("no-events");
    });

    botonesRespuesta.forEach(opcion => {
        opcion.addEventListener("click", agregarEventListenerBoton);
    });
}

cargarSiguientePregunta(numPreguntaActual);

function agregarEventListenerBoton(e){
    const respuestaCorrecta = PreguntaPiola[numPreguntaActual].correcta;
    console.log(e.currentTarget.id);
    console.log(respuestaCorrecta);

    if(e.currentTarget.id === respuestaCorrecta){
        e.currentTarget.classList.add("correcta");
    }else{
        e.currentTarget.classList.add("incorrecta");
        const correcta = document.querySelector("#" + respuestaCorrecta);
        correcta.classList.add("correcta")
    }

    const botonesRespuestas = document.querySelectorAll(".opcion");
    botonesRespuestas.forEach(opcion=> {
        opcion.classList.add("no-events");
    })
}
const btnSiguiente = document.querySelector("#siguiente");
btnSiguiente.addEventListener("click", ()=>{
    numPreguntaActual++;
    if(numPreguntaActual <= 5){
        cargarSiguientePregunta(numPreguntaActual);
    } else{
        window.location.href = "../index.html";
    }
})