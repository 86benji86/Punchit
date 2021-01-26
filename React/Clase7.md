# USEREDUCER

Hook nativo de React que remplaza useState para elementos complejos (varios estados). Control de varios estados de las propiedades (la informacion en si) de un componente. Almacen de estados mas complejos dentro de un componente.
Para elementos simples (valores primitivos y pocos), se sigue haciendo con useState.
Con redux se hacia antes de useReducer.

Los dos hooks sirven para lo mismo, guardar estado de un componente. Varia en la cantidad y en como trabajan para hacerlo.
Retorna el estado actual y de segundo elemento un dispatch (una accion de cualquier tipo que se va a disparar). La accion dentro de un objeto complejo puede hacer muchas cosas, no simplemente cambiar un unico estado (que es lo que hace el useState).
A useReducer le decimos que dispatcher queremos disparar, previo haberlas definido.

En general las acciones se aislan pero acepta definirlas en el mismo componente.
Los reducer se dividen en dos partes. El reducer en si mismo que hace toda la logica y las actions que va a ejecutar.
Las aciones en general se exportan como constantes, por ejemplo si tiene dos acciones el componente:

```
export const PLUS = "PLUS";
export const MINUS = "MINUS";
```

> Las constantes se definen en mayusculas y se importan `import {NOMBRE} from "./Path";`

Despues en el reducer propiamente dicho, antes que nada, se importan las acciones:
`import {PLUS, MINUS} from "./actions/click";`

> Funcion pura: siempre para los mismos datos de entrada, va a tener los mismos datos de salida. No hay acciones y las que puede llegar a haber siempre son predecibles. Por lo general al hacer el export se le pone function en lugar del const al lugar de definirla previo al nombre.

Un reducer recibe dos cosas. Un estado actual del componente y un action a disparar.

```
function clickReducer (state, action) {
    if (action.type === PLUS) {
        state + 1;
    } else if (action.type === MINUS) {
        state - 1;
    } else {
        return state; //Retorna datos como estan si el tipo no coincide con los definidos
    }
};
```

Para los reducers se suele usar switch

```
function clickReducer (state, action) {
    switch (action.type) { //el action.type es convencion llamarlo asi pero se podria poner de cualquier forma
        case PLUS:
            return state + 1;
        case MINUS:
            return state - 1;
    default:
        return state; //Retorna datos como estan si el tipo no coincide con los definidos
    }
};
```

Y despues se lo llama en el componente que se lo va a usar.

```
const [state, stateDispatch] = useReducer(clickReducer, initialState);

const handlerPlus = () => dispatch({type: PLUS});
const handlerMinus = () => dispatch({type: MINUS});
```

Siempre que se mande algo por un dispatcher, se pasa lo siguiente:

```
action : {
    type : "";
    payload: "" {
        data: productos,
        categories: categorias
    }; //data, lo que hace o devuelve.
}
```

El payload es como esta armada la API y que se va a pedir/mandar.

### IMPLEMENTACION

Creamos una carpeta Reducers, dentro una carpeta con las actions y el reducer en si:

- actions: los verbos que hace.
- el Reducer en si.

```
import {SET_USER, GET_USER} from "./actions/user";

export const initialState = {
    user : "",
    password : ""
}

//action : {type : "", payload : {}}

export function userReducer(state = initialState, action) { //funcion pura
    switch(action.type) {
        case SET_USER:
            return {
                user : action.payload.user,
                password : action.payload.password
            }
        case GET_USER: //podria omitirse en este caso porque el default retorna lo mismo
            return {
                state;
            }
        default:
            return state;
    }
}
```
