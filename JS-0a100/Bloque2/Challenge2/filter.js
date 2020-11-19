const filter = (arreglo) => {
    let nuevoArreglo = [];
    for (let i = 0; i < arreglo.length; i++){
        if (arreglo.indexOf(arreglo[i]) === arreglo.lastIndexOf(arreglo[i])){
            nuevoArreglo.push(arreglo[i]);
        }
    }
    console.log(nuevoArreglo)
    return nuevoArreglo;
}