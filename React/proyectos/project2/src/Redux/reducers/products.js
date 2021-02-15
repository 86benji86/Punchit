import { actions } from "./../actions/products";
// import initialState from "./initialState"

const initialState = {
    products: [
        {
            id: 1,
            name: "AMD Ryzen 5 3600",
            category: "Microprocesador",
            price: 21990,
        },
        {
            id: 2,
            name: "AMD Ryzen 7 3700",
            category: "Microprocesador",
            price: 30990,
        },
        {
            id: 3,
            name: "AMD Ryzen 9 3900",
            category: "Microprocesador",
            price: 32990,
        },
    ]
};

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.ADD_PRODUCT:
            return {
                ...state, //hago una copia de lo previo
                products: [...state.products, action.payload.product] //asigno valor de lo anterior, mas lo que viene en el payload que es el product nuevo
            };
        default:
            return state;
    }
}

//46:24 delte_todo, .filter
//1.15.51
