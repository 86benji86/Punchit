/* combinar todos los reducers y generar un unico output.
Si creo nuevos, los importo en este index y automaticamente los convina.
*/

import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";

export default combineReducers({
    products,
    cart,
});