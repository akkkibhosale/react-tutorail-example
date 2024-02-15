import React, { useState } from "react";

function TestPae() {

    // const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        setTodos([...todos, { task: 'sdfsdf', status: 'dsfsd' }]);
    }
    console.log(todos);

    return (<button onClick={handleAddTodo}>Add</button>);

}
export default TestPae;