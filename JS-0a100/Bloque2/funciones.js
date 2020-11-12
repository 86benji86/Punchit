// const removerDuplicados = (array) => {
//     const newArray = []; //Va a contener solo valores no repetidos
//     for (let i = 0; i < array.length; i++) {
//         // if (!newArray.includes(array[i])){ //Si no lo incluye, pq niega el .includes que daria true en caso de que lo encuentre.
//         //     newArray.push(array[i]);
//         // } 
//         !newArray.includes(array[i]) ? newArray.push(array[i]) : null; //Igual al if en onliner
//         return newArray;
//     }
// }

// const invertirMensaje = (mensaje) => {
//     const nuevoMensaje = mensaje.split(""); //Separa cada caracter. Si se hubiese puesto un espacio, separaba cada palabra.
//     nuevoMensaje = nuevoMensaje.reverse();
//     return nuevoMensaje.join();
// }

const invertirMensajeFor = (mensaje) => {
    const nuevoMensaje = mensaje.split("");
    console.log(nuevoMensaje);
    let mensajeReverso = [];
    for (let i = nuevoMensaje.length-1 ; i >= 0 ; i--){
        // mensajeReverso.push(nuevoMensaje[i]);
        mensajeReverso[mensajeReverso.length] = nuevoMensaje[i];
    }
    let mensajeReversoUnido = "";
    for (let i = 0 ; i < mensajeReverso.length; i++){
        mensajeReversoUnido += mensajeReverso[i];
    }
    return mensajeReversoUnido;
}

