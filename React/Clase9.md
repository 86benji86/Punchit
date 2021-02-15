# TEST DRIVEN DEVELOPMENT

Desarrollo guiado por pruebas. Primero se escriben las pruebas, luego se escribe el código

A su vez, también esta el **BDD** - **Desarrollo basado en comportamiento**. Una vez que esta la aplicación, se evalúa el comportamiento general (primero se codea, después se prueba). 

Tipos (Piramide):

- E2E: End to end, de punta a punta.
- Test de integración: Probar dos o mas componentes para ver como funcionan|reaccionan entre si.
- Test unitarios: prueba de cada componente individual.

## TEST EN REACT

Dos grandes librerias|frameworks para testing.

- Enzyme: Testing no tan centrado en el usuario. Se centra en funcionalidades (estados, etc).

- React-Testing-Library: Centrada en el usuario (más para el lado del UI). Apareció algo en la interfaz es el aviso más que estados de componentes. 

  - Se instala desde npm con: npm install --save-dev @testing-library/react
    - Cuando se hace el build, no se sube a producción. Son para ambiente de desarrollo y se marca con el flag -dev o -D
    - En el package.json crea un devDependencies para especificar que librerías o paquetes de testing usamos

## PRUEBAS

Se basan en los requerimientos de usuarios pero deben tener a la vez propios. 

Qué debe haber, qué debe pasar en X situación, qué debe hacer la aplicación. 

Se puede crear dentro de la carpeta de cada componente el archivo de test (ej: Form.js y Form.test.js).

También crear una carpeta \__test__ y tirar las pruebas dentro, misma nomenclatura de nombre que la forma anterior. 

  - npm run test corre las pruebas, los archivos *.test.js. 

  ## JEST

Jest esta embebido dentro de create-react-app y permite usar funciones nativas de este.

  ```javascript
  test("should be true", () => { // Que debe pasar
  	console.log("prueba");
      expect(true).toBe(true); // Que evalua 
  });
  ```

test o it hacen lo mismo. 

expect define la prueba en si. 

.toBe en general se usa para valores primitivos. 

.toEquals se usa para comparar valores que sean iguales. 

Si una comparación falla, no pasa a la linea siguiente, corta la prueba ahí. 

  ```javascript
  import {render, screen} from "@testing-library/react";
  import {ProductForm} from "./../Components/ProductForm";
  //render retorna un componente renderizado en diferentes puntos
  //screen imprime el codigo html del componente
  
  beforeEach(() => {
      render(<ProductForm />);
  });
  
  describe("when the page is mounted", => {
  	it("should exist a title Create product", () => {
      	console.log("Existe el title");
      	screen.debug(); //muestra lo que se renderiza en pantalla
     expect(screen.getByRole("heading", {name : /create product/i})); //Manda una expresion regular entre // y una i para ignorar el case sensitive
  	});
  	it("should have three inputs (name, size, description)", () => {
           expect(screen.getByLabelText(/name/i).toBeInTheDocument();
           expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
      })
  	it("should exist a submit button", () => {
          const submitBtn = screen.getByRole("button", {name: /submit/i})
          expect(submitBtn).toBeInTheDocument();
      });
  });

  describe("when the user sends the form empty", () => {
      it("should show the validation message", () => {
          const submitBtn = screen.getByRole("button", {name: /submit/i})
          expect(submitBtn).not.toBeDisabled();
          fireEvent.click(submitBtn);
      });
  });
  ```

Un describe es un agrupador. Puede tener dentro varios test. Describe que tiene que pasar en el grupo de pruebas ese. 

beforeEach() lo que hace antes de cada test.

afterEach() lo que hace después de cada test.

.getByRole sirve para acceder por el rol semántico de la etiqueta. Ej: buttons, heading, etc.

.getByText toma el html directo. Se usa para elementos que no tienen rol definido. 

.toBeInTheDocument() Que el elemento esté en el documento.

.toBeDisabled() Que el elemento esté deshabilitado. Con .not se pueden negar valores|funciones. 

fireEvent.click Dispara un evento, en este caso el click en algún elemento. 

.queryByText verificación para los elementos que esperan texto, que tienen que estar en el documento. 

En general lo que serian constantes globales, se suele crear un archivo test.utils 