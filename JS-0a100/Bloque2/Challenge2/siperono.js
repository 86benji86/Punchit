const siperono = (vector1, vector2) => {
    let nuevoArreglo = [];
    for (let i = 0; i < vector1.length; i++){
        if (!vector2.includes(vector1[i])) {
            nuevoArreglo.push(vector1[i]);            
        }
    }
    console.log(vector1);
    console.log(vector2);
    return nuevoArreglo;
}