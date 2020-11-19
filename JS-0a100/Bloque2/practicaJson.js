const maxPrice = (productos = productos) => {
    const products = [];
    for (producto of productos){
        products.push(producto.precio); //Hace un array de precios de cada producto - Ej: [500, 600, 1000]
    }
    return Math.max(...products); //De esta forma no sabes de que producto es cada precio. Con los ... pasa una copia del vector (operador spread). Menos performance que un for puro. 
}

//Mas eficiente, menos uso de memoria y menos ciclos. Una variable simple ocupa menos espacio que un array. No pasa una copia del vector a recorrer. 
const maxPriceViejoEstilo = (productos = productos) => {
    let maximo = 0;
    for (producto of productos){
        if (producto.precio > maximo) {
            maximo = producto.precio;
        }
    }
    return maximo;
}

const minimo = (stock) => {
    return Math.min(...stock);
}

const minStock = (productos = productos) => {
    const stock = [];
    // for (producto of productos){
    //     stock.push(producto.stock);
    // } // Se puede hacer oneliner como abajo
    for (producto of productos) stock.push(producto.stock)
    const stockMinimo = minimo(stock);
    console.log(`${stockMinimo}`);
}

//Mostrar que productos tiene mas colores en oferta.
const maxColores = (productos = productos) => {
    let maximo, indice, index = 0; //Define dos variables a la vez
    for (producto of productos){
        if (productos.colores.length >= maximo) {
            maximo = producto.colores.length;
            index = indice;
        }
        indice++;
    }
    // for (let i = 0; i < productos.length; i++){
    //     if (productos.colores.length >= maximo) {
    //         maximo = producto.colores.length;
    //         index = indice;
    //     }
    // }
    console.log(productos[index]);
}

const maxColoresV2 = (productos) => {
    const cantidades = productos.map(producto => producto.colores.length);
    const position = cantidades.indexOf(Math.max(...cantidades));
    //Esas dos linea hacen lo mismo que todo el for of de maxColores
}