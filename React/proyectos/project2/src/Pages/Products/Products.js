import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
// connect es simil al useContext, le hace saber al componente que va a recibir datos del store
import { connect } from "react-redux";
import actions from "../../Redux/actions/products"

const Products = (props, { addProduct }) => {
    const productRef = useRef(null);
    // console.log(props);
    return (
        <Container>
            <h3>Products</h3>

            state.product.map()

            <input type="text" ref={productRef} />
            <button onClick={() => console.log(productRef.current.value)}>Agregar al carrito</button>
        </Container>
    );
}


// recibe el state entero de todos los reducers combinados
const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
}

//connect dice a que store (estado y dispatchers) escucha el componente 
export default connect(mapStateToProps)(Products);