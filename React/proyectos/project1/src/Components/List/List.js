import "./List.css";

const List = () => {
    return (
        <div>
            <h2>Lista de Tareas</h2>
            <p className="task-completed">Tarea 1</p> 
            <p className="task-completed">Tarea 2</p>
            <p className="task-pending">Tarea 3</p>
        </div>
    );
};

export default List;