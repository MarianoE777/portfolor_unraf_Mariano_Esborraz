let word; // Definimos `word` en el ámbito global
let wordArray; // También `wordArray` en el ámbito global

const preguntas = [
    { id: 1, palabra: "goku fase mondongo" },
    { id: 2, palabra: "sombreros de pajas" },
    { id: 3, palabra: "estrella platinada" },
    { id: 4, palabra: "bolso" },
    { id: 5, palabra: "salsa" },
    { id: 6, palabra: "tener" },
    { id: 7, palabra: "romper" }
];

let numPreguntaActual = 0;

let resultElement = document.querySelector('.goku');
let mainconteiner = document.querySelector('.cubo');

function cargarSiguientePregunta(num) {
    word = preguntas[num].palabra.toUpperCase(); // Asigna la palabra en mayúsculas a `word`
    wordArray = word.split(''); // Genera `wordArray` como un array de letras

    mainconteiner.innerHTML = ""; // Limpia el contenedor de filas anteriores

    rowid = 1; // Reinicia el contador de filas
    let actualrow = document.createElement('div');
    actualrow.classList.add('shrek');
    actualrow.setAttribute('id', rowid);
    mainconteiner.appendChild(actualrow);

    drawsquares(actualrow);
    listeninput(actualrow);
    addfocus(actualrow);
}

// Llama a `cargarSiguientePregunta` para cargar la primera palabra al inicio
cargarSiguientePregunta(numPreguntaActual);

function listeninput(actualrow) {
    let squares = actualrow.querySelectorAll('.shrek1');
    squares = [...squares];
    let userInput = [];

    squares.forEach(element => {
        element.addEventListener('input', event => {
            if (event.inputType !== 'deleteContentBackward') {
                userInput.push(event.target.value.toUpperCase());
                console.log(userInput);
                if (event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                } else {
                    let squaresFilled = document.querySelectorAll('.shrek1');
                    squaresFilled = [...squaresFilled];
                    let lastfivesquaresFilled = squaresFilled.slice(-18);
                    let finaluserInput = [];
                    lastfivesquaresFilled.forEach(element => {
                        finaluserInput.push(element.value.toUpperCase());
                    });

                    let existindexArray = existLetter(wordArray, finaluserInput);
                    existindexArray.forEach(index => {
                        squares[index].classList.add('gold');
                    });

                    let rightIndex1 = compareArrays(wordArray, finaluserInput);
                    rightIndex1.forEach(index => {
                        squares[index].classList.add('green');
                    });

                    if (rightIndex1.length == wordArray.length) {
                        showresult('iGanaste!');
                        return;
                    }

                    let actualrow = createrow();

                    if (!actualrow) {
                        return;
                    }

                    drawsquares(actualrow);
                    listeninput(actualrow);
                    addfocus(actualrow);
                }
            } else {
                userInput.pop();
            }
            console.log(userInput);
        });
    });
}

// Funciones auxiliares

function compareArrays(array1, array2) {
    let equalsIndex = [];
    array1.forEach((element, index) => {
        if (element == array2[index]) {
            equalsIndex.push(index);
        }
    });
    return equalsIndex;
}

function existLetter(array1, array2) {
    let existIndexArray = [];
    array2.forEach((element, index) => {
        if (array1.includes(element)) {
            existIndexArray.push(index);
        }
    });
    return existIndexArray;
}

function createrow() {
    rowid++;
    if (rowid <= 5) {
        let newrow = document.createElement('div');
        newrow.classList.add('shrek');
        newrow.setAttribute('id', rowid);
        mainconteiner.appendChild(newrow);
        return newrow;
    } else {
        showresult(`Perdiste, la palabra era "${word.toUpperCase()}"`);
    }
}

function drawsquares(actualrow) {
    wordArray.forEach((_, index) => {
        actualrow.innerHTML += `<input type="text" maxlength="1" class="shrek1 ${index === 0 ? 'focus' : ''}"></input>`;
    });
}

function addfocus(actualrow) {
    let focusElement = actualrow.querySelector('.focus');
    if (focusElement) focusElement.focus();
}

function showresult(textmsg) {
    console.log("Mensaje de resultado:", textmsg); 
    resultElement.innerHTML = `
        <p>${textmsg}</p>
        <button class="pirata">Siguiente</button>
        <button class="pirata2">Menu</button>`;
    
    let nextBtn = document.querySelector('.pirata');
    let menuBtn = document.querySelector('.pirata2');

    nextBtn.addEventListener('click', () => {
        // Limpiamos el mensaje y los botones
        resultElement.innerHTML = "";

        // Incrementamos el número de pregunta
        numPreguntaActual++;
        
        // Verificamos si quedan preguntas
        if (numPreguntaActual < preguntas.length) {
            cargarSiguientePregunta(numPreguntaActual);
        } else {
            // Si se llega al final de las preguntas, reiniciamos al inicio
            numPreguntaActual = 0;
            cargarSiguientePregunta(numPreguntaActual);
        }
    });

    menuBtn.addEventListener('click', () => {
        window.location.href = "../Index.html";
    });
}