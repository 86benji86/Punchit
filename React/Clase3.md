NextJS -> Framework de React que permite trabajar server side rendering con React (que sino es client side por defecto. Next corre por debajo un node.js.

En general en las aplicaciones SPA se usan CSR. Lo que requiere posicionamiento, se recomienda usar SSR (menor tiempo de carga y mejor posicionamiento -SEO-).

# TIPOS DE COMPONENTES (e intro testing)

En general se tiene 2 tipos de componentes, unos de **logica** y otros de **presentacion**. Esto facilita aislar mejor el codigo y hacer pruebas unitarias mas especificas.

TDD: Test-driven development o Desarrollo guiado por pruebas. Se escriben las pruebas previo al codigo de la aplicacion. Se escribe el codigo hasta que pasa las pruebas. Implica mas inversion de tiempo pero a la larga ahorra recursos a futuro.
Se puede usar Jest (evalua funcionalidades, si funciona) o React-testing-library (evalua comportamientos, como).

BDD: Behavior-driven development o Desarrollo basado en comportamiento. Como interactuan ciertos componentes entre si y todos integrados. BDD se suele hacer en la instancia final.

Pasos a groso modo:
Anden componentes > Peticiones correctas > Que se inyecta en el DOM > Verificar que andan elementos de usuario (botones, inputs, etc) > Verificar si se insertan en los estados

```
e.preventDefault(); // Cuando se da un evento, previene el comportamiento por default de un nodo.
```

Con el operador spread se hace una copia de lo previo. Si se quiere pisar un valor (generando un id nuevo por ejemplo), se lo situa previo de la propiedad que se va a cambiar

```
import shorid from "shortid";

const workObject = {
    ...work, //id:"", work:"tarea", state: false
    id: shortid(),
}
```

Componentes dentro de componentes => Composicion

Las props bajan, de un padre a un hijo.
Los eventos pasan de un hijo y se ejecutan en un padre.

Los componentes representan un grafo (un arbol). App.js envuelve al resto de los componentes de la aplicacion, es el nodo comun al resto, la raiz del arbol.

Prop drilling es el paso de de props entre componentes. Un componente hace de intermediario en el paso de una prop entre componentes no conectados directamente. No se recomienda a hacer mas de 1 paso intermedio.

## EVALUADOR INMEDIATO

Si una condicion se cumple, automaticamente ejecuta una sentencia.
Es como un operador ternario pero simplificado (no tiene termino falso). En lugar del ? usa &&
Ej:
condicion && sentenciaAutomatica;

## ESTILO DE COMPONENTES

Para usar una hoja de estilo propia al componente, se importa la misma como si fuese otro componente
import "./Archivo.css";

Bootstrap usa styled components.

### ESTILOS EN LINEA

Dentro de javascript los estilos en linea estan interpretados como json. No es la mejor practica pero se puede llegar a usar.

```
const ejemplo = {
    cursor: "pointer",
}
<p style={true ? 'ejemplo1' : 'ejemplo2'} id={id} onClick={deleteWork}>😫</p>
```

### CLASES ESTATICAS Y DINAMICAS

Clases estaticas, siempre van a aplicar el mismo estilo

```
<p className="cuadraditoRojo">Hola</p>
```

Clases dinamicas permiten hacer evaluaciones para decidir que estilo se va a aplicar.

```
<p className={status === "Alive" ? "cuadraditoRojo" : "cuadraditoVerde"}>Hola</p>
```

Incluso se puede hacer uso de funciones dentro de las llaves

```
const getClass = (status) => {
    ...;
}

<p className={getClass(status)}>
```

## REACT.MEMO

```

import React from 'react'
React.memo(({ prop }) => {

```

Es un HOC (High order component, componente de orden superior).
Controla los elementos que no cambian su estado para no repintarlos de vuelta.
Guarda la referencia del nodo para controlar eso. Si la referencia sigue igual, evita renderizarlo. Sino, renderiza de vuelta.
Por ejemplo se usa en headers y footers que no suelen cambiar.

React.memo se pone en cada componente que sabemos que no va a ser modificado.

Con React Developer Tools (extension de Chrome), en las opciones -la rueda- dentro de Components, se puede activar que destaque el componente que se va actualizando a medida que eso pasa.
En React cada componente que cambia su estado, se hace un render del mismo (por esto se puede usar Memo en caso de no querer que se rerenderice todo).
Rerenderizar implica cargar todo de nuevo, incluso las funcionesno solo el HTML
