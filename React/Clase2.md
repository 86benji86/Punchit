Comentarios en React:
{/\* Comentario \*/}
Esto es asi porque para pasar codigo js se usan las {}

# PROPS|ARGUMENTOS

Forma que tiene la libreria de pasar elementos a un componente hijo. La comunicacion de padre a hijo es mediante props.
Las props pueden recibir funciones (como los objetos que son).
A traves de las props se crea un atributo y un valor.
Ej:

```
<Header titulo="Titulo de prueba" />
```

Props es el argumento que llega como parametro. Se lo puede llamar de la forma que se quiera (p). Se pueden mandar N props|argumentos.
Para acceder despues a la prop, se la llama con el: props.propiedad
Con destructuring se podria acceder con {propiedad} porque el conjunto de props (los argumentos de la funcion) se pasan como un objeto.

No es valido mandar valores que no son strings, salvo que se lo pase encerrado entre {} (En realidad, con los strings acepta el paso sin cerralo).
Ej:

```
<Col md={4} />
```

> React Developer Tools es una extension del browser que permite ver todo el arbol de componentes.

Para recorrer y retornar elementos, se usa map que devuelve un elemento html.

Dentro de React **no se usan eventListeners**, lo maneja por debajo la libreria.
Para eventos se los llama con camel case (en js no). Esto es por el Virtual DOM y los llama eventos sinteticos, no interactua directo con el DOM real.
Todo lo que es funciones|logica|variables|estados, van arriba del return (.
React pasa la referencia del disparador del evento.
Ej:

```
onClick={add} /*Sin () para que no ejecute directo*/
o
onClick={() => add()}
```

Dentro del paradigma funcional, dentro de un componente no existen las mutaciones -definir una variable y cambiar su valor despues-.
React maneja esto con el concepto de **estado**. Un estado es un objeto que brinda informacion global al componente especifico(es una "variable" de alcance global en realidad).

> Props drilling: pasaje de props a un o varios elementos que no las usan, para así llegar a otro nodo comun entre esas dos, el cual si las va a usar.

## HOOK

Es una funcion que resuelve un problema.

[React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/) es una lista de todos los Hooks de react con ejemplos interactivos. Recomendada para revisar. 

Generacion de estados:

```
import {useState } from "react";
const [nombreEstado, setEstado] = useState([]);
```

nombreEstado es el getter, el que devuelve el valor del estado en el momento que se solicita.

setEstado es el encargado de setear los array con objeto dentro de ese estado.

- useState es una funcion que controla el estado por ejemplo. Se recomienda que useState se use para casos sencillos (un contador por ejemplo).
  - const estado = useState(0); - Devuelve un array con posiciones.
    - La primera es el estado inicial, un getter del valor que tiene.
    - La segunda es una funcion que modifica el estado, un setter que asigna el nuevo valor.
- useEffect es para montaje, actualizacion y destruccion.
- useReducer para manejo de estados complejos.

```
const input = useState("");
const name = input[0];
const setName = input[1];
o
const [name, setName] = useState(initialState);
```

```
<h2>{name}</h2>
```

Cada vez que se actualiza un estado, React vuelve a renderizar los nodos que cambiaron.

```
const [name, setName] = useState(initialState);

const handlerFunction = (e) => {
    setName(e.target.value);
};

return (
    <input type="text" onChange={handlerFunction} />
);
```

Cuando se tienen que almacenar varios elementos (mas de dos por ejemplo), se los puede encapsular|agrupar dentro de un objeto.

Cuando hay varias props a pasar, como useState se usa para manejar estados simples, se usa el operador spread en el objeto.
{...user, name: e.target.value}
Esto nos ahorra poner propiedad.valor de cada uno de los props del objeto (porque sino modifica todos). Con ...user almacena el estado previo y DESPUES actualiza el valor del estado indicado.

Para manejo mas prolijo de estados complejos -varios valores-, se identifica el input con un name="nombre", asegurando que el nombre elegido coincida con el del estado que se quiere modificar del objeto.
Dentro de un objeto, se envuelven las variables dentro de [variable] : "nuevo valor"

```
obj = {[dato] : "correo@co.com"}
```

## LIBRERIAS STYLED COMPONENTS

- Ant Design
- Chakra
- [React Booststrap](https://react-bootstrap.github.io/components/alerts)
- Material

## TODO PROJECT

Todo con manejo de estados, funciones y props.

Usa map para retornar por cada iteracion un nodo html. De esta forma, arma de manera dinamica una lista con los elementos de un objeto.
Como es js, lo mete dentro de una expresion {}

```
{
items.map(({id, work, state}) => (
    <h4 onDoubleClick={deleteWork} key={id}>
        {id} - {work} - {state ? "Cumplido" : "Pendiente"}
    </h4>
))}
```

En React, a cada nodo que se retorna al html, se lo identifica con una referencia key con nombre unico (un id por ejemplo).
La key unica siempre se la da al padre.
