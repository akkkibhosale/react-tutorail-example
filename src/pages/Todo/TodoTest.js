import React, { useState, useEffect } from "react";
import './Todo.css'
import { FaArrowLeft, FaArrowRight, FaTimesCircle } from "react-icons/fa";


function TodoTest() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')));
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);

    const handleAddTodo = () => {
        if (task.trim() !== '') {
            setTodos([...todos, { task: task, status: false }]);
            setTask('');
        }
    };
    const handleRemoveTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    }

    const completeTask = (index, status) => {
        todos[index].status = status;
        setTodos([...todos]);
    };

    useEffect(() => {
        setTasksRemaining(todos.filter(task => !task.status).length)
        setTasksCompleted(todos.filter(task => task.status).length)
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="mainContainer">
            <header style={{ textAlign: "center", border: "1px solid grey", padding: "20px" }}>
                <h1>TODO LIST </h1>
                <br />
                <div className="todo-input">
                    <input
                        type="text"
                        placeholder="Enter task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button onClick={handleAddTodo}>Add</button>
                </div>
                <div className="d-flex">
                    <ul className="todo-list border px-2">
                        <p className="bg-primary text-white p-1">Pending List <span className="badge rounded-pill bg-danger">{tasksRemaining}</span></p>
                        {todos.map((todo, index) => (
                            todo.status ? "" :
                                <li key={index} className="btn btn-sm btn-danger shadow border">
                                    <p className="m-0">{todo.task}</p>
                                    <p className="m-0">
                                        <span className="btn"><FaArrowRight onClick={() => completeTask(index, true)} /></span>
                                        <span className="btn"><FaTimesCircle onClick={() => handleRemoveTodo(index)} /></span>
                                    </p>
                                </li>
                        ))}
                    </ul>
                    <ul className="todo-list border px-2">
                        <p className="bg-primary text-white p-1">Completed List <span className="badge rounded-pill bg-danger">{tasksCompleted}</span></p>
                        {todos.map((todo, index) => (
                            !todo.status ? "" :
                                <li key={index} className="btn btn-sm btn-success shadow border">
                                    <p className="m-0">{todo.task}</p>
                                    <p className="m-0">
                                        <span className="btn"><FaArrowLeft onClick={() => completeTask(index, false)} /></span>
                                        <span className="btn"><FaTimesCircle onClick={() => handleRemoveTodo(index)} /></span>
                                    </p>
                                </li>
                        ))}
                    </ul>
                </div>
            </header >
        </div >
    );
}

export default TodoTest;