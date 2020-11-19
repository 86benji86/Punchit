const plusx5 = () => {
    let numero = [];
    let acumulador = 0;
    for (let i = 0; i < 5; i++){
        numero[i] = parseInt(prompt(`Ingresar numero ${i + 1}:`));
        acumulador += numero[i];
    }
    console.log(numero.join(" - "));
    return acumulador;
}