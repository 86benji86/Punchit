let contador = 0;
let numero1, numero2 = 0;
const contar = () =>{
    contador++;
    console.log(contador)
}

const sumar = () =>{
    contador++;
    console.log(contador)
}

const restar = () =>{
    contador--;
    console.log(contador)
}

// const operacion = (op = '+') =>{
//     op === "+" ? contador++ : contador--;
//     console.log(contador)
}

const handlerInputNumber = (e) => {
    console.log(e.input);
    // const value = e.target.value; //Devuelve la referencia del evento que se disparo
    // Si e.id es igual a numero1, la persona escribio en la primer casillo. Sino, es numero2. 
    e.id ==="numero1" ? numero1 = parseInt(e.value) : numero2 = parseInt(e.value);
}

const operacion = (op) => {
    // op =>+ - * / ^ sqrt log
    switch(op){
        case '+': 
            numero1 + numero2;
            break;
        case '-':
            numero1 - numero2;
            break;
        case '*':
            numero1 * numero2;
            break;
        case '/':
            numero2 !== ? numero1 / numero2 : "MATH ERROR";
            break;
        default: 
            alert("No permitida");
    }
}