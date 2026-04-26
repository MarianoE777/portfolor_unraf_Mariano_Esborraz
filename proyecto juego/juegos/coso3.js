const preguntas = [
    {
        id: 1,
        numero1: "55 - 39",
        numero2: "9 = 7",
        correcta: "Menos",
    },
    {
        id: 2,
        numero1: "5 X 3",
        numero2: "6 = 90",
        correcta: "Multiplicar",
    },
    {
        id: 3,
        numero1: "150",
        numero2: "0,6 X 5 = 50",
        correcta: "Dividir",
    },
    {
        id: 4,
        numero1: "1,282 ÷ 2",
        numero2: "958 = 1,599",
        correcta: "Mas",
    },
    {
        id: 5,
        numero1: "10 X 100",
        numero2: "87 X 3 = 739",
        correcta: "Menos",
    },
    {
        id: 6,
        numero1: "0,3 X 3",
        numero2: "0,5 = 1.8",
        correcta: "Dividir"
    },
];

const imagenesData = [
    { id: "Mas", src: "Mas.webp" },
    { id: "Menos", src: "Menos.png" },
    { id: "Multiplicar", src: "Multiplicar.png" },
    { id: "Dividir", src: "dividir.webp" }
];

let numPreguntaActual = 0;
let respuestaSeleccionada = "";

function cargarSiguientePregunta(num) {
    const numero1 = document.querySelector("#numero1");
    const numero2 = document.querySelector("#numero2");

    numero1.innerHTML = preguntas[num].numero1;
    numero2.innerHTML = preguntas[num].numero2;

    // Limpiar el área de respuesta y ocultar el botón
    document.querySelector(".box").innerHTML = ""; // Vaciar el box
    document.getElementById("siguiente").style.display = "none"; // Ocultar al cargar

    // Resetear la respuesta seleccionada
    respuestaSeleccionada = "";

    // Volver a generar las imágenes en el contenedor
    const contenedorImagenes = document.querySelector(".contienedor2");
    contenedorImagenes.innerHTML = ""; // Limpiar el contenedor antes de agregar las imágenes

    imagenesData.forEach(imagen => {
        const img = document.createElement("img");
        img.src = imagen.src;
        img.id = imagen.id;
        img.alt = imagen.id;
        img.draggable = true;
        img.ondragstart = drag; // Asignar la función de arrastre
        img.width = 100; // Ajustar el tamaño
        img.height = 100; // Ajustar el tamaño
        contenedorImagenes.appendChild(img); // Agregar la imagen al contenedor
    });
}

cargarSiguientePregunta(numPreguntaActual);

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");

    // Colocar la imagen en el box
    if (!respuestaSeleccionada) {
        respuestaSeleccionada = data; // Guardar la respuesta seleccionada
        ev.target.appendChild(document.getElementById(data));

        // Ocultar la imagen arrastrada
        document.getElementById(data).style.display = "none"; // Ocultar la imagen
        document.getElementById("siguiente").style.display = "block"; // Mostrar el botón
        agregarEventListenerBoton();
    }
}

function agregarEventListenerBoton() {
    const respuestaCorrecta = preguntas[numPreguntaActual].correcta;
    const box = document.querySelector(".box");
    
    box.classList.remove('green', 'red');

    if (respuestaSeleccionada === respuestaCorrecta) {
        box.classList.add('green');
        console.log("Respuesta correcta: " + respuestaCorrecta);
    } else {
        box.classList.add('red'); // Para mostrar una respuesta incorrecta
        console.log("Respuesta incorrecta, se esperaba: " + respuestaCorrecta);
    }
}

// Manejar el botón "Siguiente"
document.getElementById("siguiente").addEventListener("click", function() {
    numPreguntaActual++;
    if (numPreguntaActual < preguntas.length) {
        const box = document.querySelector(".box");
        box.classList.remove('green', 'red');
        cargarSiguientePregunta(numPreguntaActual);
    } else {
        window.location.href = "../index.html"; // Redirigir al menú de inicio
    }
});

// Cargar la primera pregunta
cargarSiguientePregunta(numPreguntaActual);