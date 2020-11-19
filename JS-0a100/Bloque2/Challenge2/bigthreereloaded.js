const elMayor= (numero1, numero2, numero3) => {
    document.write(`<p>${numero1} - ${numero2} - ${numero3}</p>`)
    if (numero1 == numero2 && numero1 == numero3){
        document.write(`<p>Los tres numeros son el mismo (${numero1}).</p>`)
    } else if (numero1 > numero2 && numero1 > numero3) {
        document.write(`<p>El ${numero1} es el mayor de los tres.</p>`)
    } else {
        if (numero2 > numero3) {
            document.write(`<p>El ${numero2} es el mayor de los tres.</p>`)
        } else {
            document.write(`<p>El ${numero3} es el mayor de los tres.</p>`)
        }
    }
}