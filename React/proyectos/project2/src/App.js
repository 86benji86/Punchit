import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store"
import Products from "./Pages/Products/Products";
import Cart from "./Components/Cart/Cart";

//Todos los componentes comparten el store, que tiene los reducers (con el estado dentro y las actions que soportan los reducers)

function App() {
  return (
    <Container>
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/products" component={Products} />
          <Redirect to="/products" />
        </BrowserRouter>
        <Cart />
      </Provider>
    </Container>
  );
}

export default App;
