# REDUX

Libreria para generar estados.
Soluciona el mismo problema que Context, el compartir estados entre componentes.

Con context se define un objeto global para compartir información y no tener props drilling excesivo.
Redux hace lo mismo pero de una forma diferente.

Es libreria agnostica, no es solo para React. Es una libreria para javascript y se puede usar con otros frameworks|librerias.

## ARQUITECTURA FLUX

Redux implementa el patrón de diseño Flux. Se supone que es más rápido que el patrón MVC.

MVC funciona de la siguiente manera (ida y vuelta constante):

- Modelo: interactura con la db
- Controlador: interactua con el modelo
- Vista: muestra al usuario lo que devuelve el controlador

Flux funciona de manera distante para evitar ese ida y vuelta constante.
La comunicación es unidireccional. Se puede tener varios providers

De una acción -> Se ejecuta un dispatcher (flux) -> Todo lo que está conectado a redux, comparten un store global (un provider) -> Vista (en React)

Se ejecuta a traves del dispatcher que lleva la accion al store global que almacena el estado de la aplicación.
El store le pasa la información a la vista y actualiza los componentes conectados.

Context y Redux se pueden implementar en aplicaciones chicas y medianas.
En aplicacione grandes (redes sociales por ejemplo) se pueden usar otras. Cuando la anidación de componentes es muy grande, Redux|Context ya quedan chicos para usar.

> Wouter es una alternativa más liviana a react-router-dom

1. npm i redux react-redux react-router-dom

Redux tambien modifica el estado a traves de un dispatcher (como los reducer).

- Dir Redux >
  - Dir actions
  - Dir reducers
  - store.js

ACTIONS > todo.js

```
export const actions = {
    ADD_TODO : "ADD_TODO",
    MODIFY_TODO : "MODIFY_TODO",
    DELETE_TODO : "DELETE_TODO"
};
```

REDUCERS > todo.js

```
import {actions} from "./../actions/todo";

const initialState = {
    todos : [
        author : {name : "benji"},
        { id: 1, description : "prueba de algo", status: false}
    ],
};

export default function todoReducer(state = initialState, action); // nuestro reducer
    switch(action.type){
        case actions.ADD_TODO:
            return {
                ...state, //conserva el estado acá
                // devuelve lo que ya había dentro por el spread y el payload de todo, lo que está definido arriba en el initialState
                // si queremos que la tarea nueva se agregue encima de las que ya estan, se pasa primero el payload y después el spread
                todos : [...state.todos, action.payload.todo],
            };
        case actions.DELETE_TODO:
            return {
                ...state,
                // entra en el estado al array de todos y filtra por state id. Trae todos los distintos al que se le está pasando que es el que se borra
                todos : state.todos.filter((todo) => todo.id !== action.payload.id),
            };
        default:
            return state;
    };
};
```

REDUCER > index.js

```
// combinar todos los reducers que se tiene y los exporta de una vez -genera un único output-

import {combineReducers} from "redux";
import todo from "./todo";

export default combineReducers({
    todo,
});
```

STORE.JS

```
import {createStore, applyMiddleware} from "redux";

//rootReducers es el nombre que queramos por como lo exportamos en el index.js
import rootReducers from "./reducers/";

export default store =createStore(rootReducers, applyMiddleware(redux-thunk));
```

La idea es que a partir de todos los reducers que se tenga, se genere un store general a esos.
combineReducers acepta un objeto como parametro donde ponemos todos los reducers que vamos a pasar -previo haberlos importado a todos-.

El dispatch lleva la información al store.

Middleware es una función que se interpone entre una ruta y función -entre el state y el dispatch-
Es el encargado de llevarle a los componentes las funciones adicionales que tenemos en redux.

Redux es sincrónico, no soporta promises.
Hay una librería extra que hace que funcione de forma asincrónica: **redux-thunk**

- import {thunk} from "thunk";
- , applyMiddleware(thunk);
  - Se lo aplica a todos los reducers

Exportando en el index los nuevos reducers, ya estamos suscribiendolos a ese store global (el provider).

PAGES > Todos.js

```
import {Container, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";


const Todos = ({dispatch, todo : {todos}}) => {

const deleteActivity = (id) => {
    console.log(id);
    dispatch({type : actions.DELETE_TODO, payload : { id }});
};

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Todo's list</h3>
                    {
                        todos.length ?
                        todos.map((todo) => (
                            <div>
                                // Se puede separar esto dentro de un componente de presentación aparte
                                <li>{todo.description}</li>
                                <button type="button" onClick={() => deleteActivity(todo.id)}>
                            </div>
                        ))
                        ) : (
                            <h4> No hay tareas</h4>
                        )
                    }
                </Col>
            </Row>
        </Container>
    );
};

// mapStateToProps recibe el estado de todos los reducers y define que estado particular va a recibirexportar el componente
const mapStateToProps = (state) => {
    return {
        todos : state.todo //retornas el que interesa
    }
}

// connect acepta como parametro 2 cosas. El estado y los dispatchers que le brinda a ese componente
// mapStateToProps solo le pasa lo relevante a todos en este caso. Se puede indicar que pasarle y que no de los reducers
export default connect(mapStateToProps)(Todos);
```

APP.JS

```
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import AddTodo from "./Components/AddTodo";

function App() {
    return (
        <Provider store={store}>
            <AddTodo />
            <BrowserRouter>
                <Route path="./todos.js" component={Todos}>
                <Redirect path="./todos">
            </BrowserRouter>
        </Provider>
    );
};
```

En Context, dentro del componente teníamos que poner useContext para que se suscriba y consuma de este. Así recibe la información.
En Redux también hay que indicar en el componente que va a consumir del store global.

- Con connect de react-redux hacemos lo mismo que useContext.

COMPONENTS > AddTodo.js

```
import {Container, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import {nanoid} from "nanoid/non-secure";

const AddTodo = ({dispatch}) => {
    const addTask = (e) => {
        e.preventDefault();
        const [description] = e.target;
        const obj = {
            id : nanoid(),
            description : description.value,
            state : false,
        };
        dispatch({type: "ADD_TODO", payload : {todo: obj}});
    };
};

const AddTodo = () => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <form onSubmit={addTask}>
                        <input type="text" placeholder="nueva tarea" />
                        <button typer="submit">Agregar</button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(AddTodo);
```

Poniendo el `<AddTodo />` dentro del `<Provider>`hacemos que reciba el estado y los dispatchers.

## ANIDADO DE FUNCIONES EN JS

const function = () => {
return
function2
return ;
}

function()() llama al return de function2 definido dentro de la otra función.

## GRAPHQL

No hay peticiones a endpoints. El front le especifica que elementos tiene que traer, puede indicar que quiere traer especifcamente, generando peticiones más chicas (traen solo los datos necesarios y no todos).
La complejidad de la request queda del lado del front.

Es autodocumentado. Se genera la documentación a medida que se codea en el backend.
Es similar al TDD para el armado del back. Pide primero el esquema de datos (interfaz) para saber bien que tiene que hacer la aplicación y recien ahí empezar a codear.
