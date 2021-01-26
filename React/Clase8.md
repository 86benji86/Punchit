# CONTEXT Y REDUCERS

> Next.js: Server side rendering con React. Devuelve directamente un html, no es transparente al usuario (mas seguro). Manejo mas sencillo de rutas.

En todo lo que es el estado de la aplicacion, hay cosas que se pasan a traves de **context**. El context es un objeto global a la aplicacion.
Esto permite no hacer demasiado prop drilling (que es un paso mas directo de informacion entre componentes).
Hay elementos que siempre se tienen que compartir al resto. Con el context podemos pasar informacion de un componente a toda la aplicaion, de forma global. Por ej: la autentificacion de usuario o lenguaje.

## USECONTEXT

Provee una forma, un objeto global llamado context, al que todos los nodos se suscriben y ahi adquieren|consumen las propiedades de ese objeto. Evita hacer props drilling -pasaje de props a elementos que no las usan para llegar a otro que si la usa-.
Cuando se cambia cualquier elemento del context, cualquier hijo de la aplicacion perciben el cambio, sin actualizar nada aparte.

Nuestro componente de contexto, no tiene HTML, es un componente funcional, lo que hace es pasar informacion de forma implicita hacia abajo, al resto de los componentes que envuelve.

Todos los context tienen 2 partes:

- proveedor: provee el contexto, al que se suscriben
- consumidores: los que se suscriben al contexto

Se pueden definir varios contextos en la misma aplicacion.
Ej: authenticate, lenguajes, modo oscuro, tipo de usuario

Una vez creado, simplemente se consume, nada mas. No se especifican props ni nada al traerlo.

## REACT-HELMET

Modulo de React usado para SEO. React genera una SPA (single page applications), mas alla de las pages generadas dentro de este (por los `<BrowserRouter><Route>` de react-router-dom).

React-Helmet es un modulo que permite hacer SEO dentro del concepto de SPA. Helmet va a estar en cada pagina, no en cada componente. SEO de cada pagina.

Se puede aislar la logica de React-Helmet dentro de un componente (ej: seo.js) y llamar al componente con las props necesarias. Por ej: title y description.

1. npm i react-helmet
2. import {Helmet} from "react-helmet"

```
import {Helmet} from "react-helmet";
import propTypes from "prop-types";

const Seo = ({title, description}) => { //Se puede pasar todos los componentes que correspondan a meta etiquetas ademas
    return (
        <Helmet>
            <title>{title}</title>
            <meta description={description} />
        </Helmet>
     );
}

Seo.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default Seo;
```

> .tsx: "Migracion" a typeScript. Implica que vale el mismo codigo de JS pero ademas acepta sistema de tipos de datos.

Para implementar el componente de Seo, se lo importa en la page que se lo va a usar.

```
import Seo from "./../Componentes/Seo";

const Login = () => {
    return (
        <>
            <Seo title="Login" description="Login del sitio" />
            <h3>Login</h3>
        </>
    );
};

export default Login;
```

## RUTAS PUBLICAS Y PRIVADAS

Su acceso se filtra por algun tipo de condicion.

- publicas: acceso a cualquier usuario. Ej: login.
- privadas: acceso restringido en base a alguna condicion|criterio. Se verifica la autentificacion del usuario a traves del contexto por ejemplo.
  - Si esta logueado muestra componente, sino redirige al login.

Creamos carpeta Routes y dentro definimos PublicRoutes.js y PrivateRoutes.js

```
import {BrowserRouter, Route, Redirect} from "react-router-dom";

const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/login" exact />
            <Redirect path="/login" />
        </BrowserRouter>
    );
};

export default PublicRoutes;
```

```
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Dashboard from "./../Pages/Dashboard";

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/dashboard" exact component={Dashboard}/>
        </BrowserRouter>
    );
};

export default PrivateRoutes;
```

Y en el App.js se importan los componentes de rutas.

```
import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import {AuthProvider} from "./context/Auth";

function App() {
    return (
        <>
            <AuthProvider>
                <PublicRoutes />
                <PrivateRoutes />
            </AuthProvider>
        </>
    );
};

export default App;
```

## LOGIN

```
import {useReducer} from "React";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {userReducer, initialState} from "./../reducers/user";
import {SET_USER} from "./../reducers/actions/user";
import {AuthContext} from "./../context/Auth";
import Seo from "./../Component/Seo";

const Login = ({history}) => {

    const [state, dispatch] = useReducer(userReducer, initialState); //dispatch es la action que le pasa al custom reducer userReducer.

    // lo que recibe en {} es la interfaz que va a recibir
    const {authenticate} = useContext({AuthContext});

    const handlerSubmit = e => {
        e.PreventDefault();
        const [user, password] = e.target; //estado de un objeto, mas complicado por eso usar reducer en lugar de useState. El estado de las dos props es el payload, la informacion que tiene
        dispatch({type : "SET_USER", payload : {user.value,password.value}});
        // POST a /users
        // servidor respondes con token si el user esta ok
        // guarda ese token en el context porque lo va a revisar para cualquier cosa de la app
        // setear en localStorage|sessionStorage|cookies (useCookies|useStorage ya existen para eso)
        // redirige el usuario al dashboard, ruta protegida
        const serverResponse = "myToken";
        authenticate(serverResponse}); // improvizado porque no hay servidor
        history.push('/dashboard');
    };

    return (
        <>
            <Seo title="Login" description="Login de usuario" />
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit="{handlerSubmit}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="user" name="user" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="password" placeholder="***" name="password" />
                            </Form.Group>
                            <Button type="submit">Loguear</Button>
                        </Form>
                    </Col>
                </Row>
            <Container>
        </>
    );
};

export default Login;
```

El login afecta a toda la aplicacion porque de que este logueado el usuario depende lo que se muestra en pantalla y a las rutas que tiene acceso o no el usuario.

En una carpeta context se definen los contextos en componentes. Estos componentes envuelven a toda la aplicacion en App.js.
Todos los componentes|elementos que existen en la aplicacion, se suscriben al objeto|componente de contexto, Auth.js en nuestro caso.

```
import React, {createContext, useState} from "react";

export const AuthContext = createContext() => {
    // El contexto va a tener 3 cosas. El auth|token, la funcion de autenticar y la funcion de logout que define abajo. Aca crea el contexto que es como una interfaz

    auth : null,
    authenticate : () => {}, // {} es como poner void pero js no tiene tipado.
    logout : () => {}
}

export const AuthProvider = ({children}) => {
    // Aca crea el provider que le dice a los hijos que van a poder hacer

    const {auth, setAuth] = useState(null)}; // aca se guarda el json web token

    // define que pueden hacer los usuarios al estar autenticados
    const authenticate = () => {
        setAuth({token : 'myToken'}) // recibe un objeto
        // y setear el storage
    };
    const logout = () => {
        setAuth(null);
        // y limpiar el storage
    };

    return <Provider value={{auth, authenticate, logout}}>{children}</Provider> // Lo que le pasa a todos los descendientes
}
```

Siempre que se renderiza un componente dentro de otro, el componente recibe el componente children. Todos los componentes que son padres de otros, reciben de forma implicita la prop children que simboliza todos los componentes inmersos en un componente principal.
{children} permite renderizar todos los componentes que esten envueltos dentro de un componente principal.

Cuando se crea un contexto, se devuelve un objeto de tipo provider (que viene de nuestra "interfaz").
Al Provider, al momento de definirlo, hay que asignarle un value indicando que elementos se les quiere pasar | a que elementos tienen acceso a traves del provider. Value es una prop required.

Hay elementos que pueden no suscribirse al Context. Un footer podria ser uno. No reciben la informacion del provider porque no la van a usar.

## PROFILER

En React Developer Tools se puede medir el rendimiento de la aplicacion. Un gantt de elementos|componentes que se cargan y rerenderizan.
Si esta mal diseñada la aplicacion, son muchoslos componentes que se recargan (peor rendimiento). A mayor prop drilling, mas recarga (pintado de amarillo es que se renderea mas de una vez).

## USECALLBACK

Hook que almacena en memoria una funcion. Si el componente se renderizo, la funcion no se vuelve a crear (en un rerenderizado por cambio de estado) .

- react.memo => recarga o no de componentes sin actualizaciones
- useMemo => memorizar informacion en estado virtual de React
- useCallback => memorizar funciones en estado virtual de React

## DAHSBOARD

```
import {useContext} from "react";
import {AuthContext} from "./../context"Auth";

const Dashboard = () => {
    const {auth, logout} = useContext(AuthContext);

    return (
        <>
            <h3>Dashboard</h3>
        </>
    );
};

export default Dashboard;
```
