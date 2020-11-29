const hamdlerInput = (id) => {
    const element = document.getElementById(id);
    element.value.trim() === "" ? element.style.border = "2px solid red" : element.style.border = "2px solid blue";
}

const sub = () => { 
    e.preventDefault(); //evita el comportamiento por defecto de botones y enlaces. Ej: se usa para validaciones. Evita que mande al tocar.
}

function start() {
    //console.log("%c Hola vieja", "color: red");
    //Empieza a escuchar estos inputs cuando se pierde el foco de la caja de texto y ejecuta la funcion anonima que le sigue
    document.getElementById("nombre").addEventListener("blur", () => handlerInput); //emmiter -> observer
    document.getElementById("password").addEventListener("blur", () => handlerInput); //emmiter -> observer
    document.getElementById("email").addEventListener("blur", () => handlerInput); //emmiter -> observer

    //Empieza a escuchar el evento submit dentro de los formularios
    document.getElementById("form").addEventListener("submit", sub);
}

window.onload = start;