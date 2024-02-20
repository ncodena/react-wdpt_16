import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        const retrievedList = localStorage.getItem("items");
        const loadedList = JSON.parse(retrievedList);
        if (loadedList) {
            setTaskList(loadedList);
        }
    }, []);

    useEffect(() => {
        const storedList = JSON.stringify(taskList);
        localStorage.setItem("items", storedList);
    }, [taskList]);

    const addTask = () => {
        if (!newTask.trim()) return;
        const task = {
            id: Date.now(),
            taskName: newTask,
            completed: false
        };
        setTaskList([...taskList, task]);
        setNewTask("");
    };

    const deleteTask = (id) => {
        setTaskList(taskList.filter((task) => task.id !== id));
    };

    const editTask = (id) => {
        const updatedTask = taskList.map((task) => {
            if (task.id === id) {
                task.taskName = editingText;
            }
            return task;
        });
        setTaskList(updatedTask);
        setEditing(null);
        setEditingText("");
    };

    const completeTask = (id) => {
        setTaskList(taskList.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };

    const handleEdit = (id, text) => {
        setEditing(id);
        setEditingText(text);
    };

    const cancelEdit = () => {
        setEditing(null);
        setEditingText("");
    };

    return (
        <div style={{ padding: '20px' }}>
            <form onSubmit={addTask}>
                <input
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Type something..."
                    value={newTask}
                />
                <button type='submit'>Add a new task</button>
            </form>
            <div>
                <h2>Tasks</h2>
                {taskList.map((task) => (
                    <div key={task.id} style={{ marginBottom: '10px' }}>
                        {editing === task.id ? (
                            <div style={{display: 'flex' }}>
                                <input
                                    type="text"
                                    onChange={(e) => setEditingText(e.target.value)}
                                    value={editingText}
                                />
                                <div style={{display: 'flex', gap: '8px' }}>
                                    <button onClick={() => editTask(task.id)}>Save Edit</button>
                                    <button onClick={cancelEdit}>Cancel</button>
                                </div>
                                
                            </div>
                        ) : (
                            <div style={{display: 'flex', gap: '1em' }}>
                                <input
                                    type="checkbox"
                                    onChange={() => completeTask(task.id)}
                                    checked={task.completed}
                                />
                                <p style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>{task.taskName}</p>
                                <div style={{display: 'flex', gap: '8px' }}>
                                    <button onClick={() => handleEdit(task.id, task.taskName)}>Edit</button>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;