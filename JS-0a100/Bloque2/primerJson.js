//Scope global
const alumnos = [
    {
    id : 1,
    nombre : "Juan",
    apellido : "Perez",
    apodo : "Juanelo",
    mascotas : [
            {
                nombre : "Ruperto",
                tipo : "Perro",
            },
            {
                nombre : "Canelo",
                tipo : "Hamster",
            }
        ],
    musica : ["Pop", "Rock"],
    },
    {
    id: 2,
    nombre : "Sebastian",
    apellido : "Lopez",
    musica : ["Cumbia"],
    bandas : [
            {
                nombre : "Banda del lechuga",
                tipo : "Cumbia villera",
        
            },
            {
                nombre : "Leo Mattioli",
                tipo : "Cumbia santafesina",
            },
        ]
    },
    {
    cantidad : 5,
    },
]

//Scope global
const docente = {
    nombre : "Franco",
    apellido : "Di Leo", 
    apodo? : "Frantuko",
    // saludo : function() {alert(`Hola ${docente.nombre}`)},
    // saludoAlterno : () => {alert(`Hola 2 ${docente.nombre}`)},
    edad : 34,
    casado : false;
    coloresFavoritos : ["Rojo", "Azul", "Negro"],
    mascotas : [
        {
            nombre : "Goofy",
            tipo : "Perro",
            vivo : false
        },
        {
            nombre : "Batman",
            tipo : "Perro"
        },
        {
            nombre : "Caty",
            tipo : "Gato"
        },
    ],
}

//Si no recibe ningun parametro, usa el que esta definido por defecto
const comprobarEdad = (edad) => edad >= 18 ? console.log("Es mayor") : console.log("Es menor");

const mostrarMascotas = (mascotas) => {
    for (let i = 0; mascotas.length; i++){
        console.log(mascotas[i].nombre);
    }

}

const mostrarDocente = (objetoLiteral = docente) => {
    console.log(`${objetoLiteral.nombre} ${objetoLiteral.apellido}`);
    comprobarEdad(obj.edad);
    mostrarMascotas(obj.mascotas);
}

const recorrerDocente = (obj = docente) => {
    const props = Object.keys(obj);
    for (prop of props) {
        console.log(`${prop}: ${obj[prop]}`);
    }
}
