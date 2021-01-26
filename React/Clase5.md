# BUSCADOR (SEARCH) - PAGINADOR - ASIDE

## SEARCH

Hay dos formas de hacer un search:

- Local: cargar toda la informacion y despues filtrar todo en el front.
- Filtro en el back directamente.

Un buscador en tiempo real, se suele hacer que cuando el usuario termina de escribir, recien ahi se hace la peticion. Se setea un time out para hacerla.
Si se hiciera cada vez que el usuario apreta una tecla (como en el caso de un filter en tiempo real), es inviable por la cantidad de peticiones al servidor que se hacen (perjudica el rendimiento).
Con el time out da la sensacion de que es en tiempo real aunque no lo sea.

Con el type="submit" del componente Button se controla el enter. El boton tiene que estar dentro del `<Form>` para que funcione.
Asimismo, tiene que estar la funcion handler definida en el `<Form>`tambien

```
<Form onSubmit="{handlerSubmit}> //Control del enter
    <Button type="submit">Buscar</Button>
</Form>
```

Para hacer uso de lo que se escribe para buscar, en el App.js traemos un useState que inicialmente va a estar vacio pero que va a buscar un string (los "").

```
const [search, setSearch] = useState(""); //inicialmente no hay busqueda

const handlerSearch = (value) => {
    setSearch(value);
};

<Search handlerSearch={handlerSearch} />
<Characters search={search}> //cuando se modifique el estado de Search, se lo pasa App a Characters como value para que busque y muestre lo encontrado
```

Se pasa la informacion a traves de las props de cada componente, todo mediante el componente raiz que es App.
Despues mediante un useEffect actualiza el componente cada vez que el usuario busca algo:

```
useEffect (() => {
    const newUrl = search ? `${BASE_ENDPOINT}?name=${search}` : BASE_ENDPOINT;//ejecuta este useEffect
    setUrl(newUrl);
} [search]); //modifica este estado
```

Si cambia la url|si busco algo, se setea la url, se modifica el elemento url y ese elemento modificado vuelve a disparara el hook custom useFecth.

## PAGINATION

El valor previo de paginacion, solo se tiene que mostrar si HAY uno. Puede que la API informe como null el prev y se puede resolver asi. Sino vamos a tener que hacer una evaluacion.

```
const [url, setUrl] = useState(BASE_ENDPOINT);

const handlePages = (newUrl) => {
    setUrl(`${BASE_ENDPOINT}?{newUrl}`);
};
```

Una vez que se cambia la URL mediante el handler de pages definido, hay que indicar a useFetch para que cambie el contenido de la pagina (que se vuelva a ejecutar basicamente).
Nuestro useFetch en lugar de llamar siempre a la constante endpoint, tiene que apuntar a url que es el valor que cambiamos cada vez que se haga click en la flecha next. Si llama siempre al endpoint, siempre va a mostrar lo mismo.

## ASIDE
