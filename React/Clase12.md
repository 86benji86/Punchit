## useMemo != React.memo

Sirve para memorizar información.

- React.memo se aplica para memorizar componentes.

- useMemo se aplica para memorizar información (a la respuesta de una API por ejemplo). Recibe una función y un array de dependencias. Se usa cuando se van a traer muchos valores, que a nivel de computo impacta en el rendimiento. 

- useCallback sirve para memorizar funciones. 

  - SI ya están creadas al cargar el componente, no se vuelvan a cargar por modificaciones del estado de este. El useCallback es lo que recibe la función como parámetro al definirla. 

  - Se llama al useCallback y se define dentro la función que no queremos que se cree de vuelta. 

  - ```
    const funcionMemorizada1 = useCallback(
    	() => {
    		hacerAlgo(a, b);
    	};
    	[a, b],
    );
    
    const increment = useCallback(() => {
    	setCount(count + 1)
    }, [count])
    ```

# TYPESCRIPT

Para poder configurar todo con TypeScript, se puede hacer desde:

- npx create-react-app --template typescript
  - Crea varios archivos de configuración de ts (que va a usar Babel para compilar el proyecto).

Los archivos pasan a ser .ts. 
TypeScript es un superset de javascript, una "mejora" en cuanto a lenguaje. 

De forma nativa es orientado a objetos y es un lenguaje fuertemente tipado (tipos de datos específicos). Evita a usar propTypes de forma nativa por ejemplo. Permite frenar muchos errores en desarrollo, antes de compilar incluso porque obliga a ser riguroso con las variables y lo que se trae.

```javascript
interface iPersonajes = {
    id : numer;
    nombre : string;
}

const variable : tipoDeDato;
const nombre : string;
const edad : int;
const personajes : iPersonajes;

variable = valor; // controla el tipo de dato definido al inicializar la variable

const sumar = (n1 : number, n2 : number) : number => { // recibe dos parametros de tipo number y retorna un number 
    return n1+n2;
}
```

El archivo **tsconfig.json** contiene todas las opciones de compilación del proyecto con TypeScript. Se transpila a js. 

- La opción allowJs en ese archivo permite seguir aceptando js puro.
- El modo strict hace al control de tipos. 

.tsx es TypeScript & JavaScript. Es lo que va a permitir poner código js en un archivo ts. Al crear un componente|modulo, ponerle .tsx como extensión de archivo. 

- Si pones .js no acepta tipos.
- Si pones ts no deja definir arrow functions.

: void no retorna nada. 
: any acepta cualquier tipo de dato

## AXIOS como singleton

Sirve para evitar importar las constants en cada archivo mientas se use Axios. 

Un singleton, es un patrón que se usa dentro de un constructor. Si se crean varias instancias de un objeto, el constructor se instancia en cada una. 
En cambio el singleton, asegura que se ejecute una sola vez, independientemente de cuantas veces se haga el apicall. 

Un singleton ejecuta una sola vez una cosa (si ya está creado, no más). 

En src creamos un archivo que se llame API.js

```javascript
import axios from "axios";
import {BASE_URL} from "./constants"

export default axios.create{
	baseURL: BASE_URL,
}
```

Cualquier llamada hecha con Axios, antepone la baseURL definida ahí. baseURL viene dentro del método create de Axios. 

Ahorra definirla en cada llamada. 

```javascript
import API from "./../API"

const {data: productInfo } = await API.get("/items/${id}");
// Antes era const {data: productInfo } = await axios.get("${BASE_URL}/items/${id}");
const {data: description } = await API.get("/items/${id}/description");
```

Ya no hace falta llamar a {BASE_URL}, solo hace falta indicar el endpoint. 

Se podría crear una instancia de axios en caso de tener varios microservios|backs (ej: uno para usuarios, productos, etc.). 

```javascript
import axios from "axios";
import {BASE_URL} from "./constants"

export const axiosProduct = axios.create({
	baseURL: "products.dominio.com.ar",
});

export const axiosUsers = acios.create({
    baseURL: "users.dominio.com.ar",
})
```

## 

## [WOUTER](https://github.com/molefrog/wouter) Y LAZYPATTERN

Sirve para manejar rutas -páginas-, alternativa a react-router-dom. Versión minimalista de este último. Se puede usar con o sin typescript. 

Lazy Pattern es un patrón de comportamiento. Patrón de carga diferida. Carga bajo demanda diferentes modulos|elementos. Lo que el usuario está usando o visitando. 

**lazy** hace un import dinámico, una carga diferida. El import por defecto de js bloquea la carga del resto de los componentes|elementos hasta que no esté cargado lo que se está importando (es síncrono). Con **lazy**, solo hace el import del componente al solicitar una determinada ruta, no antes. 

**Suspense** es un componente de React que se encarga de darle una respuesta al usuario, cargar en segundo plano un componente lazy, mientras al usuario le aparece un fallback (un spinner por ejemplo, un mensaje). Suspense wrapea a todos los elementos lazy. 

Cuando la promise se resuelve, se avisa a suspense y ahí se muestra la ruta. Cuando se completa la carga, aparece el componente. 

routes > index.tsx (donde )

```javascript
import { lazy, Suspense} from "react";
import { Link, Route } from "wouter";

const Home = lazy(() => import("../Pages/Home")) ; // carga diferida del componente
const Routes = () => {
    return 
    	<Suspense fallback={<h3>Cargando...</h3>}>
			<Route path="/" component={Home}/>;
             <Route path="/search" component={Search};
       	</Suspense>
};

export default Routes;
```

La página queda fragmentada. Se crean n.chunks.js que representan las partes que conforman el bundle de la aplicación. React hace un code splitting previo. 

Pages > Home.tsx

```javascript
import Headers from "./../Components/Header"
const Home: React.SFC = () => { // SFC quedó deprecated y va a aparecer tachado. Ahora se usa .FC, functional component que sería el tipo del componente. Se puede evitar ponerlo también
    const [counter, setCOunter] = useState<number>(0); // especifica el tipo de dato que tiene y pasa como parametro el valor en que se inicializa
    
    const add = (): void => { // setea un estado, no devuelve nada
    	setCounter(counter +1);
    };
    
    const rem = (): void => {
        setCounter(counter -1);
    };
        
    return (
        <>
	        <Header title="TitulO" />
    	    <h1>Hola</h1> 
        	<button type="button" onClick={add}>+1</button>
        	<button type="button" onClick={rem}>-1</button>
        </>
	);
};

export default Home;
```

Cualquier componente retorna un functional component. Ese es el tipo de los componentes. 

Components > Header.tsx

```javascript
// También podría definirse una interfaz 
// type iHeader = {
// title: string;
// }
// const Header = ({title} : iHeader) => {

const Header = ({title} : {title : string}) => {
	return <h1>{title}</h1>
};

export default Header;
```

Cuando un componente empieza a recibir props, React entiende que eso es un nodo.
Se puede especificar que el tipo sea React.ReactNode

## [MaterialUI](https://material-ui.com/es/getting-started/installation/)

Como bootstrap tiene componentes armados a modo de interfaz visual. Se usa mucho en mobile. 

Se puede usar con otras librerias|frameworks como Angular, Vue, etc. 

```javascript
import { makeStyles } from "@material-ui/core/styles";
import { Componente } from "@material-ui/core";
```

makeStyles: Pueden definir estilos que solo afecten a un componente especifico. 

Lo que hacen es crear una constante useStyles que llama a la funcion makeStyles. 

```javascript
const useStyles = makeStyles((theme) => {
    claseDefinida: { // la que se quiera, button, tomato
        backgroundColor: "red",
    };
});

return (
	<div className={classes.claseDefinida}>
		<Button variant="contained" onClick={handlerInput} color="secondary">+1</Button>
)
```

El grid funciona con filas y columnas. Y los parámetros de estilo se pasan todos como props. 

Se puede definir un spacing entre columnas (es como un margin en bootstrap).
Permite definir columnas con la misma resolución de colapse que Bootstrap (xs=12, 6, 3).

Define un grid de tipo **Container** y un grid de tipo **Item**.

- El container es la Row.
- Item es la Col.

```javascript
<Grid container spacing={3} justify="center" alignItems="flex-end">
	<Grid item xs={6}>
		<h3>Hola</h3>
		<form>
			<TextField id="standard-basic" fullWidth label="Search" />
         </form>
	</Grid>
</Grid>
```

## [WHIMSICAL](https://whimsical.com/flowcharts)

Se usa para diseño de componentes, diagramas de flujo, etc. 

Diagrama de componentes, ver que componentes están importados en otros, props que llegan y de dónde. 

## MOCKAPI.IO

Para diagramar APIs con sus endpoints. Se puede usar incluso para consumir en proyectos. 

Genera información aleatoria para consumir en cada endpoint. 

## FIREBASE

"DB gratuita" online. Funciona a base de JSon (get y post). 

Genera endpoints de consulta y posteo. Por abajo corre MongoAtlas. 