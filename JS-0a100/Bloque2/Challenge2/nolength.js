const sinLength = (string) => {
    contador = 0;
    for (let i = 0; string[i] !== undefined; i++){
        contador++;
    }
    return contador;
}