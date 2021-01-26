# ROUTING

## MODULOS NECESARIOS

- react-router-dom: permite hacer routing ("pages" individuales dentro de la spa). Se usa en Client Side Rendering.
  - BrowserRouter: Parte de react-router-dom. Componente que provee el historial de navegacion del usuario dentro de la pagina.
    Provee una API que dice en que punto esta, que hay delante o detras.
- react-hook-form: maneja los formularios.
- yup + @hookform/resolvers: se usan para validacion de formularios, del input pasado, mediante un schema (interfaz).

1. npm install react-hook-form react-router-dom yup @hookform/resolvers
2. import {BrowserRouter, Route} from "react-router-dom"

Router: el historial de navegacion.
Route: las rutas dadas.

Se definen lo mas arriba posible de la aplicaion.

Router añade un contexto, el history, a una ruta a la cual encierra.

```
<BrowserRouter>
    <Route path="/" exact component={Home} />
    <Route path="login" component="{Login} /> //tambien podria hacer una evaluacion en lugar de mandar al componente directamente
</BrowserRouter>

const Home = () => {
    return (
        <>
            <h1>HOME</h1>
        </>
    );
};
```

El raiz, lo renderiza en todos, es el de mas bajo nivel. Para que no lo muestre en todos (comportamiento por default), le pasamos como prop exact.
Esto aplica tambien para subrutas, donde tambien tendria que especificar exact en el que coincide (Ej: /login y /login/admin renderizaria los dos porque /login coincide en ambos).

Si se quiere pasar info (parametros), se puede envolver el componente dentro del componente de ruta. Se puede hacer de cualquiera de las dos formas.

```
<BrowserRouter>
    <Route path="login">
        <Login {...data} />
</BrowserRouter>
```

```
<BrowserRouter>
    <Route path="login" render={() => {
        <Component {...data} />
    }} />
</BrowserRouter>
```

De esta forma con Routing ya se puede hablar de Pages en lugar de solo componentes. Cada page esta armada por varios componentes.

Cuando hay componentes dentro de los componentes se llama composicion.

Layout: Almacena todo lo que es comun y de estructura a toda la aplicacion. El navbar, aside, footer.

BrowserRouter de forma implicita, al envolver una ruta, farma una serie de props:

- history: para moverse dentro de la aplicaion.
- location: a donde estas.
- match: ruta exacta que renderiza.

Lo que permite el paso de todas estas props es navegar entre componentes y no recargando todos cada vez que se va a otra parte de la aplicacion.

Se puede hacer un Navbar que apunte a los distintos paths y envolverlo dentro de `<BrowserRouter>`.

LazyLoad es un patron de diseño. Patron de carga perezosa o diferida. Se divide la aplicacion en varias partes y se carga el componente que requiere el usuario (por defecto la SPA cargan todo si no se especifica).
La aplicacion puede ser un main chunk (el codigo compilado) o varios chunks divididos.

## <LINK>

Link se usa dentro de la etiqueta `<BrowserRouter>`. Usa las props que vienen incluidas con BrowserRouter.
El `<a href>` no se usa mas porque recarga toda la pagina. Se usa la etiqueta `<Link>` de react-router-dom.

1. import {Link} from "react-router-dom";
2. `<Link to="/login">Login</Link>`

Esto permite hacer evaluaciones redirigir en caso de que la ruta no exista.

1. import {BrowserRouter, Route, Redirect} from "react-router-dom";
2. `<Redirect to="/register" />`

Cuando le pasamos una ruta a la aplicacion, evalua a cual coincide y si no la encuentra, cae en el Redirect. Es una especie de case.
Entonces lo que podemos hacer para no poner exact a cada path, se puede el componente Switch que funciona como un case.

```
<Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Redirect to="/register" />
</Switch>
```

## USEFORM

El hook useForm retorna el estado de 3 cosas:

- register: la referencia de cada elemento que escucha el form (user y pass por ej). Que controlo.
  - Para indicar que se escuche se pasa la prop `ref={register}` dentro del input.
- handleSubmit: agarrar los elementos escuchados y validarlos contra un esquema que especifiquemos. Dispara la funcion que le ordenamos. Como lo controlo.
  - Ej: `<Form onSubmit={handleSubmit(submitForm)}>`.
  - Es una funcion de react-hook-form que dispara nuestra funcion.
- errors: los errores que devuelve.

A cada uno se accede por nombre, no por posicion.
El register no devuelve el evento en si sino el objeto con toda la informacion que estamos escuchando .

## VALIDAR - SCHEMA (LOGIN, INPUTS, ETC)

Dentro de nuestro schema.js del componente, se usa para validar inputs

1. import \* as yup from "yup"; //\* es all
2. Definir el esquema a controlar

```
import * as yup from "yup";

export const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3, "al menos 3 caracteres").max(10, "maximo 10").required("Campo obligatorio"), //los mensajes entre comillas son opcionales.
    age: yup.number().positive().required(),
});

```

Regla => nameDeLaPropiedad: yup.tipoDeDato().formaDelObjeto()|.requiredSiEsObligatorio()
Se puede usar expresiones regulares propias tambien en caso de necesitarlas (si algo no esta predefinido en yup).

Se importa despues con `import {schema} from "./schema";` y `import {yupResolver} from "@hookform/resolver/yup";` y lo usamos dentro del useForm.

```
const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
    });
```

Abajo de cada control se puede aplicar una expresion que evalue si existen los errores en cada Form.Control y lo muestre cada vez que eso pase.
`{errors.email && (<span classNAme="text-danger">Correo no valido</span>)}`
Cuando coincide con nuestro schema, desaparece el error. Es un onkeypress, no onsubmit.

## USEHTTP - CUSTOM HOOKS CON AXIOS

Componente con custom hooks para el manejo de peticiones GET, POST usando axios.

```
import {useState} from "react";
import axios from "axios"; //peticiones http, cancelar solicitudes

const BASE_URL = "http://localhost:8000";

export const usePost = () => {
    const [response, setResponse] = useState(null); //estado inicial null
    const [fetching, setFetching] = useState(null);

    const postData = async (endpoint, object) => {
        try {
            setFetching(true); //spinner cargando
            const response = await axios.post(`${BASE_URL}/${endpoint}`, object); //objeto que va a mandar a la url
            setResponse(responseData);
            setFetching(false) //spinner escondido
        } catch (e) {
            console.error(e);
        }
    }
    return [postData, response, fetching] //exporta la funcion, la respuesta y el fetching
}

export const useGet = () => {
    const [response, setResponse] = useState(null); //estado inicial null
    const [fetching, setFetching] = useState(null);

    const getData = async (endpoint) =>{
        const getData = await axios.get(`${BASE_URL}/${endpoint}`);
        setResponse(getData);
        setFetching(false);
    }
};
```

Esto despues se importa en donde tenemos el formulario donde vamos a enviar informacion:
`import {usePost} from "./../CustomHooks/UseHTTP";`

## ROUTES

Para los componentes de rutas se crea una carpeta de rutas publicas y privadas (en caso de haber de ambos tipos) para tener bien denotadas las rutas.

El submit devuelve un vector de targets:

```
e.target[0].value
o
const [{value}] = e.target;

if (value.trim()) {
    handlerSearch(value.trim());
}
```

# USEHISTORY

Expande la informacion del `<BrowserRouter>`.

### PROPS

No se puede pasar las props que se quiere sin definirlas previamente previo import de propTypes from "prop-types".
El componente Route acepta ciertas props predefinidas solamente.

Si le pasas algo sin haberlo definido, llega como undefined al otro componente.

Se puede anidar el componente, componer, por ejemplo, Product a la ruta y pasar ahi las props.

Lo que le dice que la ruta para buscar es ?search="string" es el onSubmit={search} que ponemos dentro del `<Form.Control>`.

### DEFINIR PROPS PROPIAS (PROPTYPES)

Para definir props custom que va a recibir un componente anidado en un Route se hace con PropTypes. Se define tambien el tipo de prop que va a recibir (numero, string).

Se pone la definicion afuera y abajo del return

```
import PropTypes from "prop-types";
...;
return (
    ...
    );
};

ComponentesQueRecibe.propTypes = {
    propCustom: PropTypes.tipoDeDato,
};
```
