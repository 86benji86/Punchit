import { actions } from "./../actions/products";
// import initialState from "./initialState"

const initialState = {
    cart: [
        { id: 2, name: "Ryzen 7 5700", price: 6000 },
    ],
};

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.DEL_PRODUCT:
            return {
                ...state, //hago una copia de lo previo
                cart: {
                    ...state.cart,
                    cart: state.cart.filter((car) => car.id !== action.payload.id) //asigno valor de lo anterior, mas lo que viene en el payload que es el product nuevo
                },
            };
        default:
            return state;
    }
}