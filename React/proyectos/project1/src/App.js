// React components first
// import './App.css';
//Reactstrap previo npm i bootstrap react-bootstrap (lo agrega al package.json como dependencias)
// Custom components
import Header from "./Components/Header/"
import Footer from "./Components/Footer/"
import List from "./Components/List/List.js"
import { Badge, Container, Row, Col } from "react-bootstrap";


function App() {
  return (
    <Container fluid>
        <Header />
        <Row>
          <Col md={1}>
            Columna 1<Badge variant="secondary">X</Badge>
          </Col>
          <Col md={1} >Columna 2</Col>
          <Col md={10} className="text-right">Columna 3</Col>
        </Row>
            <List />
        <Footer className="flex-shrink-0"/>
      </Container>
  );
}

export default App;
