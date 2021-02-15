# USEEFFECT + CUSTOMHOOKS

Dos tipos de peticiones http:

- fetch: funcion nativa del navegador para hacer peticiones.
- axios: libreria de terceros que incorpora cancelacion de peticiones, intersector y permite cachear contenido .

Intersector
Dentro del backend hay codigos de respuesta (100, 200, 300, 400). El rango del 300 implica peticiones cacheadas.
Se puede cachear el cotnenido del back en caso de que se repita una peticion igual.
Del lado del front pasa lo mismo. Mediante intersector se puede generar una cache local para no repetir el contenido de una peticion.

Se usa siempre que lo primero que quieras hacer es una petición http, cuando necesitas cargar algo de movida en la página. Es un get. Se usa inicialmente o cuando se actualiza una dependencia.

Siempre es preferible que las peticiones grandes se hagan desde el lado del back para no sobrecargar todo. Que se devuelva lo más específico posible. 

A traves de la version 16 de React se suele trabajar con un esquema funcional. Se suele separar a los componentes por entidad (Ej: Characters, Episodes, etc.)
Hay dos tipos de componentes:

- Estatales: basados en estados|clases. En desuso pero apps viejas pueden tenerlo.
- Funcionales: sin estado, basados en funciones. Antes simplemente retornaban un marcado. Ahora controlan el estado y ciclos de vida de un componente.

Antes se manejaba todo a traves de clase. Un metodo render principal al que se devolvia el marcado y en su return aceptaba html. No existian los hooks.
Ahora se hace desde App y usando hooks (useState).

Todos los hooks arrancan con la palabra use (state, effect, reducer, memo, context). Para crear propios, una regla es que su nombre arranque con use.

## CICLO DE VIDA

Sirve para controlar las distintas etapas de un componente funcional. Se puede detectar momentos exactos en que pasa algo con un componente.

- Mount|Montaje: cuando el componente se carga en el DOM. Ej: Peticion http cuando se carga la pagina.
- Update|Actualiza: actualizacion|cambio de un componente. Ej: componente de busqueda, solo carga de vuelta la parte de resultados.
- Unmount|Desmonta: el componente se destruye.

## USEEFFECT

React define al efecto como toda accion externa al DOM. Un cambio en el estado de un componente provocada por el usuario lo es por ejemplo, una peticion http tambien.
Se usa para controlar los ciclos de vida de un componente (mount, update, unmount).
Se lo importa de React y useEffect recibe un callback como parametro y como segundo parametro unas dependencias a las que va a estar pendiente de actualizacion.

```
import {useState} from "react";

useEffect (() => {
    console.log("Montaje de componente :D");
});
```

Si no se especifica nada como segundo parametro, al cambiar cualquier elemento, se ejecuta de nuevo. Si se especifica (pasando un [] array de listener como segundo parametro es una forma), solo cuando cambia eso. El [] vacio simboliza que va a pasar una vez. Es un **observer**.
Al aceptar un array como parametro, se puede definir un elemento o muchos elementos a controlar sus cambios de estado (ej: [counterMas, counterMenos]). Se suscribe a los elementos especificados, si esta vacio a ninguno.

A los hooks no se les permite hacer operaciones asyncronicas.

### PETICIONES HTTP

Se hacen mediante useEffect que recibe un callback con una funcion async dentro.
**Siempre** hay un array que rellena la informacion de la api, un componente de cargando (fetching en true es que se esta cargando y false que ya se cargo) y errores (inicialmente en false, si tira error pasa a true).

Characters.js - Componente de logica

```
import {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import Character from "./Character"

const BASE_URL = "https://rickandmortyapi.com/api";
const Characters = () => {
    const [characters,setCharacters] = useState([]); //guarda la informacion dentro del estado
    const [fetching, setFetching] = useState(true); //verifica cuando el componente esta haciendo la peticion y cuando dejo de hacerla para mostrar los personajes
    const [error, setError]
    const getCharacters = async = (endpoint) => {
        try {
            const result = await fetch(`${BASE_URL}/${endpoint}`);
            const data = await result.json;
            setCharacters(data.results); //array de personajes
            setFetching(false); //cuando se resuelve la promesa, actualiza el estado del componente
        } catch (error) {
            setError(true);
            setFetching(false);
            setCharacters([]);
        }
    };

    useEffect(() => {
        getCharacters('character'); //characters es el endpoint en este caso pero se podria especificar cualquier otro endpoint como parametro
    }, []);
    return (
        <Row>
            {
            fetching
            ? <h3>Cargando...</h3>
            : characters.map((character) => (
                <Character key={character.id} {...character} /> //...character descompone todas las propiedades del objeto y se las pasa al elemento de presentacion que es <Character >. En Character lo destructuras por los atributos que quieras
            ))
            }
        </Row>
    );
};

export default Character;
```

Character.js - Componente de presentacion

```
import {Col, Card } from "react-bootstrap";

const Character = ({image, id, name, gender, species}) => {
    return (
        <Col md={4} className="mt-3 mb-3 text-center">
            <Card>
                <Card.Img variant={"top"} src={image} />
                <Card.Body>
                    <Card.Title>
                        {name} - {gender}
                    </Card.Title>
                   <Card.Text>
                        <p>Estado: {status}</p>
                        <p>Especie: {species}</p>
                    </Card.Text>
                    <Button type="button" variant="primary" block>//block expande el boton al 100% del bloque. Clase de bootstrap
                        Ver más
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Character;
```

Que un componente sea de presentacion, no significa que dentro de ese se pueda manejar el estado de un componente.

Siempre que haya una peticion http, hay que asegurarse de que haya un control de las dependencias de los efectos (el segundo parametro del callback de useEffect). Desde un [] a elementos especificos.

### [REACT-SPINNERS](https://www.npmjs.com/package/react-spinners) O IMPLEMENTAR COMPONENTES DE TERCEROS

1. Instalar el spinner para la carga.
   npm install --save react-spinners
2. En el componente de logica lo importamos.
3. En el return se lo llama al componente ClipLoader

```
import ClipLoader from "react-spinners/ClipLoader";

<ClipLoader
    color={"black"}
    css={{display: "block", margin: "0 auto}}
    loading={fetching}
    size={150}
/>
```

El spinner funciona en funcion del estado. Se muestra lo que tarde en cargar la app, no tiene un setTimeout.

Tambien se lo puede implementar como un Componente aparte y llamarlo despues directamente, previa importacion del ClipLoader en nuestro componente de logica, con `<Loading />`. Facilita la reutilizacion de codigo hacerlo de esta forma.
**Si se repite, se aisla y se llama al componente donde haga falta**.

Componente de presentacion:

```Loading.js -
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
    return (
        <ClipLoader
            color={"red"}
            css={{display: "block", margin: "0 auto"}}
            size={150}
        />
    );
};

export default Loading;
```

## CUSTOMHOOK

Al igual que los hooks propios de React (los que empiezan con use), se puede definir funciones -un hook es una funcion basicamente- propios.
El nombre empieza con use a modo de regla y tiene que ser descriptivo de la accion que va a realizar.
Es una funcion personalizada que involucra uno o mas hooks de React. Interactua con otros hooks.

```
import {useEffect, useState} from "react";
const BASE_URL = "https://rickandmortyapi.com/api";

const useFetch = (endpoint, initialState = {}) => {
    const [data, setData] = useState(initialState); //Devuelve un objeto vacio por default
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            const result = await fetch(`${BASE_URL/${url}`};
            const data = await result.json();
            setData(data);
            setFetching(false);
        } catch (error) {
            setData(initialState); //lo setea vacio
            setFetching(false);
            setError(true);
        }
    };
    useEffect(() => {
        fetchData();
    }, []); //con el [] ejecuta una sola vez aunque depende de la url a futuro

    return [data, fetching, error]; //se podria retornar como un objeto pero se suele retornar en un vector
};
```

En este caso no haría falta hacer un return porque la informacion se almacena en el estado. Altera el estado.
Generalmente todos los hooks retornan informacion.

Una vez definido el custom hook, para usarlo se hace lo siguiente:

1. Se lo importa en el componente que se lo va a usar.
2. Se declara como un hook de React:

```
const [characters, fetching, error] = useFetch("characters");
```

> Para destructuring se podria obtener info y results de data (lo que traemos con el fetch) y ponerle un alias a result que sea characters: const {info, results : character} = data;
> Tambien se podria hacer results as character para indicar un alias.

En el componente donde vamos a usar el custom hook:

```
import {useFetch} from "./../customHooks/useFetch";
import {Row} from "react-bootstrap";
import Loading from "./../Loading";
import Character from "./Character";

const Characters = () => {
    const [data, fetching, error] = useFetch("character");
    const {info, results: characters} = data;

    return (
        <Row>
        { fetching ? (
            <Loading />
        ) : (
            characters.map((character) => (
                <Character key={character.id} {...character} />
            ))
        )}
        </Row>
    );
};
```

## CONSTANTS

Son constantes usadas por toda la aplicacion. Una URL de base de una API es un buen ejemplo.
Las variables de entorno se podrian generar como constantes.
Se puede crear un directorio constantes con un index.js dentro donde se definen las constantes a exportar.

```
export const BASE_URL = "http://rickandmortyapu.com/api";
```

O

```
export const environment = {
    BASE_URL = "http://rickandmortyapu.com/api",
    PORT: 3000,
}
```

En la segunda forma se exportan todas definidas dentro del objeto.

Se las llama despues desde cada archivo de la aplicacion que se las necesite como

```
import {environment} from "./../constants"

environment.BASE_URL
```
