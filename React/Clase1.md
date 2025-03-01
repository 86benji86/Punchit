# REACT

Es una librería, a diferencia de Angular que es un framework. Una librería con un fin especifico que es el **control del DOM**.
Para que la aplicación sea lo mas rápida y eficiente. En lugar de escuchar eventos, brinda una interfaz de mas alto nivel que se llama _"DOM Virtual"_.

- CSR (Client Side Rendering), una aplicación frontend. El enfoque clásico.
- SSR (Server SIde Rendering), no delega el control completo de la aplicación al cliente sino que se genera de forma dinámica al servidor que, cuando lo completa, lo tira al cliente.
  - Se usa para la comunicación de APIs, protección de datos. Es mas seguro, mejor encapsulación de la información (no es claro de donde sale la información). Implica mas peticiones al servidor que CSR. Mas costo por Mas seguridad.

React se puede trabajar con JavaScript y con TypeScript (super set de js transpilado).

## HERRAMIENTAS NECESARIAS

- NodeJS
- npm | yarn (gestores de paquetes)
  - npm es de google.
  - yarn (un poco mas rapido para algunas aplicaciones de React) es de facebook.

create-react-app: Comando que permite crear una aplicacion React de 0 (la estructura base).
Comandos:

- 1. npm i -g create-react-app (Instalar create-react-app de forma global con -g)
- 2. A) create-react-app clase01
     o
- 2. B) npx create-react-app clase01 (para bajar la ultima versión y ejecutar el comando)
- 3. npm start (dentro del directorio de la aplicación). Esto compila todo el código y levanta una aplicación en http://localhost:3000
  - Si se quiere levantar mas de una aplicación a la vez, React levanta server en otro puerto.
  - **Si no están los node_modules, no corre al usar npm start (que salen de dependencies del package.json)**.
  - npm i dentro del proyecto lee todas las dependencias del package.json e instala todas. En base a eso, crea la carpeta node_modules.
- 4. npm run build (compila en html, css y jsx -una variante de js- para hacer deploy). Esto deja como resultado (a través de Babel + WebPack) una carpeta build que es lo que se sube al server.
  - Si se corre el comando de vuelta, pisa el build actual.

> Solo toma por default npm start. Para el resto de los scripts|comandos, se tiene que poner el comando run antes (ej: npm run build).

### PACKAGE.JSON

Define nombre, versión, dependencias en producción (no en desarrollo), scripts (que se puede hacer con la aplicacion, los comandos que toma).
Ya viene con react-testing y esto incorpora Jest.

## REACT Y REACT.DOM (VIRTUAL DOM)

En JS se interactúa con el DOM de forma directa. Para eso, hace uso del Virtual DOM -> Fiber (Algoritmo) -> DOM.
React hace una copia exacta de lo que es el DOM ( el Virtual DOM) sino que lo hace a traves de la interfaz que provee React con JSX.
Fiber hace un proceso de reconciliación (esta es la gran diferencia con Angular), o sea, controla que las coass del virtual DOM coincidan con el DOM y las muestra si es asi.

## PUBLIC

## SRC y SPA

Single Page Application. Renderizan una sola pagina. Solo se carga el index.html. Los componentes se insertan de forma dinámica dentro de ese index. No la recarga constantemente a la pagina, sino que inserta en la misma modificando constantemente el DOM.
Hay un div id="root" donde se va a montar toda la aplicacion. En si, el index.html no se modifica mas una vez creado. Esto lo hace index.js.

- ReactDOM.render(elementoExportadoPorAppJS, dondeLoMuestra) -> En la etiqueta root que esta en el index.html

Webpack + Babel <-- index.html (punto de entrada) <-- index.js (monta los componentes dentro del html) <-- App.js (reúne los componentes que después monta index.js)

El archivo App.js se edita para armar la aplicación. Exporta después para que el index.js lo importe.

Cuando hacemos return de codigo html -un marcado < >-, estamos retornando un componente y no solo un valor o cumplir una única tarea.

Los componentes cumplen una tarea única. Se los escribe una vez y se los llama cada vez que se necesite. El componente en si es una función y al momento de llamarlo, se hace con `<NombreComponente />`. **Se cierran todos los tags html (incluso si cierran en si)**.
Un componente es una funcion que retorna un marcado.

Se llaman desde por su nombre dentro de llaves, previo importada. Ej:

```
import Character from "./Character"

  <Character />
<Footer />
```

Para pasarle parámetros a un componente al momento de invocarlo, se hace:

```
<Componente {parametro} {...todasPropiedadesObjeto} funcion={funcion} />
```

> Para el destructuring la regla es {propiedad1, propiedad3} = objeto; donde el = se toma como de

Se puede usar JS tranquilamente en eso que se retorna (en ultima instancia es eso). React usa JS + HTML y lo llama JSX (extensión de JS).
El código dinámico JSX se ejecuta dentro de {} y se lo llama expresión. Dentro acepta funciones, condicionales, variables, código html, anidar elementos.

Components -> Partes de la pagina.
Page -> Pagina en si. La pagina acepta componentes.

Dentro de src se suele crear una carpeta Components y dentro de esa, crear archivos .js de cada componente.
En cada .js se crea una función y se la exporta. Luego en el App.js se la importa. Con rfc (un snippet de VS) se puede crear la estructura básica del componente.
Ej:

```
const Nombre = () => {
return <h2>Hola</2>;
};
export default Nombre;

```

Hay dos tipos de exportaciones:

- default: No asigna nombre, simplemente exporta algo, una sola cosa.
- export const Nombre: Si asigna y obliga a mantener el mismo nombre. Se toma por destructuring. Puede exportar muchas cosas.

Se devuelve **un solo nodo** por componente. Un `<div>` con todos los componentes dentro.
Se puede trabajar con fragmentos para devolver mas de un nodo (cada nodo que devuelve se toma como un fragmento) y no crear otro <div> que englobe eso. Se pueden poner fragments donde se quiera y cuantos se quiera.
Con `<React.Fragment> </React.Fragment>` envolviendo el marcado, evitamos que se creen `<div>` de mas por parte de react. Para esto hay que hacer:
import {Fragment} from "react";
Con destructuring se puede hacer directamente `<Fragment> </Fragment>`
Incluso se puede destructurar mas todavía haciendo lo siguiente sin importar React.Fragment:
<>
//Esto es un fragment por default
</>

## IMPORTACIONES

- import Modulo from "path/Componente" (previo exportado en default)
- import { name, lastname } from "patch/Componente" (previo exportado de constantes)

Se pueden tener .css privados. Se ponen dentro de la carpeta de cada componente que se crea dentro de la carpeta ./src/Components/NombreComponente
Se tiene que importar la hoja de estilo: import "./Footer.css"
En React esta mal visto usar ID. Usa algo que se llama Refs (usar className en lugar de class -reservada de js- por ahora en los tags). className vale en cualquier parte.
Si se quiere traer Bootstrap por ejemplo, se linkea la hoja de estilo del cdn en el index.html. No va a pisar los estilos propios de cada componente porque se agregan después.

El componente que se importa por defecto es el index.js. Si dentro de la carpeta del componente creamos un index.js y lo usamos para hacer una referencia directa simplemente.
En el index.js solamente nos limitamos a exportar Componentes. En general que se tenga una carpeta, se crea un index.js dentro con;
export {default} from "./Componente"
Y en el propio archivo .js del componente cerramos con:
export default Componente

### REACT FIRST

Hay un principio en React que se conoce como React first. Todas las importaciones de elementos propios de React, se hacen antes que el resto.
Con las definiciones de hooks, pasa lo mismo. Primero las propias de React (useState, useEffect, etc.) y después los custom hooks (los que definimos nosotros propios).

### REACTSTRAP

Reactstrap = React + Bootstrap
Dentro del proyecto se puede instalar boostrap con: npm i bootstrap react-bootstrap
Y los agrega como dependencias de desarrollo al package.json
Esto permite ignorar clases estrictas de boostrap que no se usan se las trae al App.js con:
import { Container, Row, Col } from "react-bootstrap";
Solo las clases que se quieren usar, las cuales React las toma como componentes. Se envuelve el marcado con:

```
<Container>
  <Row>
    <Col>
      <Componente1 />
    </Col>
  </Row>
      <Componente2 />
</Container>
```

Esto evita div-class y demas.

> Redux es una librería (implementada en React y Angular) para manejar el estado de la aplicación y que diferentes componentes se comuniquen entre si. En React no hay (o no había) forma nativa a nivel global. Ahora esta Context que es nativo de React.

Se pueden pasar objetos como parámetros de una función.

`nombreFuncion({objetoEntero});`
`nombreFuncion({ propiedad: valor, propiedad2: valor});`
