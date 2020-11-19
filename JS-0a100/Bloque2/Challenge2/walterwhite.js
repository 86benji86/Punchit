const walterWhite = (string) => {
    contador = 0;
    for (let i = 0; i < string.length ; i++){
        if (string[i] === " "){
            contador++;
        } 
    }
    return contador;
}