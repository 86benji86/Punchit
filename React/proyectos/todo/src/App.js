import {Container, Row, Col} from "react-bootstrap";
import List from "./Components/List/";
import Create from "./Components/Create/";
import Header from "./Components/Header/";
import Footer from "./Components/Footer/";

function App() {
  return (
    <Container fluid>
        <Header title={"ToDo List"} />
        <Row>
          <Col md={2}>
            <Create />
          </Col>
          <Col>
            <List />
          </Col>
      </Row>
      <Footer fluid/>
    </Container>
  );
}

export default App;
