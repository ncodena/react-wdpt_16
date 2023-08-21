import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
    const [updatedText, setUpdatedText] = useState(todo.text);
    const [isEditing, setIsEditing] = useState(false);


  const handleUpdate = () => {
    if (updatedText.trim() !== '') {
      onUpdate(todo.id, updatedText);
      setIsEditing(false);
    }
  };
    return (
      <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </>
        )}
      </div>
        
      </div>
    );
  };
  
  export default TodoItem;