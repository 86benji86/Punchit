import {useState} from "react";
import {Button} from "react-bootstrap";
import {nanoid} from "nanoid";

const Create = () => {

    const initialState = {
        id: "",
        task: "",
        state: false,
    };

    const handlerTask = (e) => {
        console.log(nanoid());
        const {name, value} = e.target;
        setTask({
            ...task,
            [name] : value,
    })
}

    const [task, setTask] = useState(initialState);

    return (
        <>
            <h2>Crear tarea</h2>
            <input type="text" name="task" value={task.task} onChange={handlerTask}/>
            <Button variant="primary" block>
                Agregar tarea
            </Button>
        </>
    );
}
 
export default Create;