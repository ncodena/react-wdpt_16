import TodoItem from '../components/TodoItem';
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  
  useEffect(() => {
    console.log('entra 1')

    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    console.log('entra 2')

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
        const newTodo = { id: Date.now(), text };
        setTodos([...todos, newTodo]);
      setText('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
      <div className="todo-items">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onUpdate={updateTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;