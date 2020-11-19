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

// const invertirMensajeFor = (mensaje) => {
//     const nuevoMensaje = mensaje.split("");
//     let mensajeReverso = [];
//     for (let i = nuevoMensaje.length-1 ; i >= 0 ; i--){
//         // mensajeReverso.push(nuevoMensaje[i]);
//         //mensajeReverso[mensajeReverso.length] = nuevoMensaje[i];
// 		mensajeReverso += nuevoMensaje[i]
//     }
//     return mensajeReverso;
// }

const cargarAlumnos = () => {
    let alumnos = [];
    let notas = [];
    for (let i = 0; i < 3; i++){
        alumnos.push(prompt(`Ingresar alumno ${i+1}.`));
        notas.push(prompt(`Ingresar nota de alumno ${i+1}.`));
    }
    console.log(alumnos.join(" - "));
    console.log(notas.join(" - "));
    if (notas[1] > notas [2] && notas[1] > notas[3]){
        document.write(`<p>La nota de ${alumnos[1]}, ${notas[1]}, es la más alta</p>`)
    } else {
        if (notas[2] > [notas[3]]){
            document.write(`<p>La nota de ${alumnos[2]}, ${notas[2]}, es la más alta</p>`)
        } else {
            document.write(`<p>La nota de ${alumnos[3]}, ${notas[3]}, es la más alta</p>`)
        }
    }
}