/* Aca se importan todos los reducers combinados y se crea el objeto global al que cualquier componente suscripto puede acceder
Hace un store a partir de TODOS los reducers
*/

/*
El middleware es una funcion que se interpone entre 2 elementos, una ruta y una funcion en este caso (el state y el dispatch)
*/

import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers/index"; // acepta cualquier nombre para el index por como lo exporta

const store = createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;