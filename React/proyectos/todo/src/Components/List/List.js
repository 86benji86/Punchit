//Componente funcional
import { Row, Col, Container } from "react-bootstrap";
import Item from "./../Item";

const taskList = [
    {id : 1, task: "Hacer ToDo App", state: false},
    {id : 2, task: "App que consume API en React", state: false},
    {id : 3, task: "Otro proyecto", state: false},
    {id : 5, task: "Curso JS", state: true},
    {id : 6, task: "TaTeTi", state: true},
    {id : 7, task: "Final Space", state: true},
    {id : 8, task: "BootStrap", state: true}
];

const List = () => {
    return ( 
        <Container>
            <Row>
                <Col md={6}>
                    <h2>Tareas pendientes</h2>
                    <ul className="list-group list-group-flush">
                        {taskList.map((task) => (
                            task.state === false && <Item key={task.id} {...task} />
                        ))}                        
                    </ul>
                </Col>
                <Col md={6}>
                    <h2>Tareas hechas</h2>
                    <ul className="list-group list-group-flush">
                        {taskList.map((task) => (
                            task.state === true && <Item key={task.id} {...task} />
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default List;