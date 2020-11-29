const cajas = document.getElementsByClassName("caja");

contador = 0;
const elegirCaja = (id) => {
    if (document.getElementById(id).innerText === "-" && (document.getElementById("turno").innerText !== "¡Ganó X!" && document.getElementById("turno").innerText !== "¡Ganó O!" &&document.getElementById("turno").innerText !== "Empate")){
        if (contador % 2 === 0){
            document.getElementById(id).innerText = "X";
            document.getElementById(id).classList.add("bg-primary");
            document.getElementById(id).classList.add("text-white");
            contador++;
            controlTurnos(contador);
            validarGanador();
        } else {
            document.getElementById(id).innerText = "O";
            document.getElementById(id).classList.add("bg-success");
            document.getElementById(id).classList.add("text-white");
            contador++;
            controlTurnos(contador);
            validarGanador();
        }
    }
}

const controlTurnos = (contador) => {
    if (contador % 2 === 0) {
        document.getElementById("turno").innerHTML = "Turno de X";
    } else {
        document.getElementById("turno").innerHTML = "Turno de O";
    }
}

const validarGanador = () => {
    let c1 = cajas[0].innerText;
    let c2 = cajas[1].innerText;
    let c3 = cajas[2].innerText;
    let c4 = cajas[3].innerText;
    let c5 = cajas[4].innerText;
    let c6 = cajas[5].innerText;
    let c7 = cajas[6].innerText;
    let c8 = cajas[7].innerText;
    let c9 = cajas[8].innerText;
    
    let victoriaHorizontal = 0;
    let victoriaVertical = 0;
    let victoriaDiagonal = 0;
    // Validacion horizontal
    if ((c1 === c2 && c2 === c3 && c3 !== "-") || (c4 === c5 && c5 === c6 && c6 !== "-") || (c7 === c8 && c8 === c9 && c9 !== "-")){
        victoriaHorizontal = 1;
        if (contador % 2 === 1) {
            document.getElementById("turno").innerHTML = "¡Ganó X!";
        } else {
            document.getElementById("turno").innerHTML = "¡Ganó O!";
        }
    }
    // Validacion vertical
    else if ((c1 === c4 && c4 === c7 && c7 !== "-") || (c2 === c5 && c5 === c8 && c8 !== "-") || (c3 === c6 && c6 === c9 && c9 !== "-")){
        victoriaVertical = 1;
        if (contador % 2 === 1) {
            document.getElementById("turno").innerHTML = "¡Ganó X!";
        } else {
            document.getElementById("turno").innerHTML = "¡Ganó O!";
        }
    }
    // Validacion diagonal
    else if ((c1 === c5 && c5 === c9 && c9 !== "-") || (c3 === c5 && c5 === c7 && c7 !== "-")){
        victoriaDiagonal = 1;
        if (contador % 2 === 1) {
            document.getElementById("turno").innerHTML = "¡Ganó X!";
        } else {
            document.getElementById("turno").innerHTML = "¡Ganó O!";
        }
    }
    // Empate
    if (contador === 9 && victoriaDiagonal === 0 && victoriaHorizontal === 0 && victoriaDiagonal === 0) {
        document.getElementById("turno").innerHTML = "Empate";    
    }
}

const limpiarTablero = () => {
    location.reload();
}

function start() {
    for (let i = 0; i < cajas.length; i++){
        cajas[i].addEventListener('click', () => elegirCaja(cajas[i].id));
    }
    document.getElementById("reiniciar").addEventListener("click", limpiarTablero);
}

window.onload = start;

