const completeTask = (e) => {
    console.log("completado");
}

const Item = ({id, task}) => {
    return (
            <li className="list-group-item" key={id} onDoubleClick={completeTask}>{task}</li>
        );
};

export default Item;