VISTA INDIVIDUAL

Con Reducers o useState directamente. Cada useState implica un rerender de la página. 

Dentro del state se encuentra la información. 

Usamos la etiqueta link porque va a generar una página nueva en lugar de cargar el componente en la misma que se está actualmente. 

```
<Link to={`/product/{product.id}`}>
	<Image src={product.thumbnail} />
</Link>
```

Siempre que haya un parámetro dinámico, lo identificamos con : adelante del nombre.

```
<Route path="/product/:id" component={Product} />
```

## PARAMS Y QUERY STRING

params -> /product/1

queryString -> /products/name?=remera&color?=rojo

Con react-router-dom podemos importar useParams

```
import { useParams } from "react-router-dom";
```

## VISTA INDIVIDUAL CON USEREDUCER

useProduct.js

```
import {useReducer, useEffect} from "react";
import {axios} from "axios";
import productReducer, {initialState} from "./../reducers/product";

import { BASE_URL } from "./../constants"
export const useProduct = (id) => {
	
	const [state, dispatch] = useReducer(productReducer, initialState);
	// Trae producto e info
	const getProductInfo = async (id) =>{
		try {
            // Siempre una peticion axios devuelve objeto data
            const {data : product} = await. axios.get(`${BASE_URL}/items/${id}`);
            const {data : description} = await. axios.get(`${BASE_URL}/items/${id}/description`);
            const information = {...product, description};
            dispatch({type: "FETCH_SUCCESS", payload: {product}});
        }; catch (e) {
        	console.eror(e);
        };
    };
	
	useReducer(() => {
		//peticiones asincronicas
		getProductInfo();				
	}, []);
	
	// retorna el estado con products, fetching, etc
	return [state]; 
};
```

Un customHook en general tiene que retornar algo. 

reducer > products.js

```
import { FETCHING, FETCH_SUCCESS, FETCH_ERROR} from "./actions/products";

export const initialState = {
	fetching: true,
	product: {
		
	},
	error: false,
};

export default function productReducer(state=initialState, action){
	switch(action.type) {
		case FETCHING:
			return {
				fetching: true,
				product: {},
				description : "";
				// o el initialSTate directamente solo
			}
		case FETCH_SUCCESS: 
			return {
				fetching: false,
				product: action.payload.product,
			}
		default: 
			return state;
	}
}
```

En la vista individual (la page), se llama al custom hook useProduct que definimos antes. 

## MIDDLEWARE

- react-redux (provider y store)

- react-thunk (middleware usado para resolver promesas)

- redux (y react-redux por defecto son asíncronos, por eso usamos un middleware para gestionar promesas). Gestiona los reducers para que vayan al store. 

El middleware interactúa con la API. La API es asincrónica (por defecto redux no). Cuando se resuelve la promesa de la API, previo paso por el middleware que actúa de intermediario entre Redux y la API, Redux actualiza el estado. 

El middleware resuelve la promesa, no hace la petición HTTP, eso lo hace Axios. Escucha, cuando se resuelve, pasa la información del estado. 

Redux > store.js (objeto global que almacena el estado, de este consumen los reducers). Acá se aplica el applyMiddleware(thunk) para hacer asincrónico el trabajo de pedidos a la API. redux-thunk se vuelve el encargado de despachar las promesas. Se podrían pasar otros applyMiddleware como parámetro ademas de redux-thunk. 

Redux > reducers > post.js (importa las acciones) y define la función pura del reducer (y el initialState). Acá se pone el switch que cada case es un verbo de las actions con su respectivo return y cambio de los state del initialState. 

Redux > reducers > index.js agarra todos los reducers que tiene y los exporta en un único objeto combinado. Eso se exporta al store. 

Redux > actions > post.js (acciones del dispatch, los verbos).

Envuelve a todo lo que lo vaya a usar, lo más arriba posible. Incluso a las rutas en caso de que las haya. 

En el componente se importa el connect de react-redux

```
import {connect} from "react-redux";

const Post = () => {
	//
	useEffect => api => props.dispatch({type: "FETCH"})
	api => props.dispatch({type: "FETCHSUCCESS", payload: {products}})
	//
	return <h2>Post</h2>
};

const mapStateToProps = (state) => state;

// A este componente se le va a pasar el mapState
export default connect(mapStateToProps)(Posts);

```

HoC: Componente que recibe como parámetro un componente y devuelve un componente modificado. 