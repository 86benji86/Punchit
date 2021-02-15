import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import actions from "../../Redux/actions/products"

const Cart = (props) => {
  console.log(props);
  return (
    <Container>
      <h3>Cart</h3>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

//connect dice a que store (estado y dispatchers) escucha el componente 
export default connect(mapStateToProps)(Cart);