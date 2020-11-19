const capitalize = (string) => {
    nuevoArray = [];
    nuevoArray.push(string[0].toUpperCase());
    for (let i = 1; i < string.length; i++){
        if(string[i-1] === " "){
            nuevoArray.push(string[i].toUpperCase());
        } else {
            nuevoArray.push(string[i]);
        }
    }
    return nuevoArray.join("");
}