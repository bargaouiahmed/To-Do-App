// src/components/TodoList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from '../store/reducers/todoReducer';
import '../index.css';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    text: '',
    date: '',
    image: ''
  });

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleAddTodo = () => {
    if (newTodo.title.trim() && newTodo.text.trim()) {
      dispatch(addTodo(Date.now(), newTodo.title, newTodo.text, newTodo.date || 'No Date', newTodo.image || ''));
      setNewTodo({ title: '', text: '', date: '', image: '' });
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className='font-serif'> {/* Serif font applied to entire component */}
      <div className='text-center'>
        <h1 className='text-3xl'>Todo List</h1>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4"> {/* Added spacing between form items */}
        <div>
          <label className='text-2xl'>Title:</label> {/* 2x larger label */}
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
            placeholder="Title"
            className='border border-black px-2 py-1 w-full' // 1px solid black border with padding and full width
          />
        </div>
        <div>
          <label className='text-2xl'>Text:</label> {/* 2x larger label */}
          <textarea
            name="text"
            value={newTodo.text}
            onChange={handleInputChange}
            placeholder="Todo Text"
            rows="50"
            cols="50"
            className='border border-black px-2 py-1 w-full h-20' // 1px solid black border, padding, full width
          ></textarea>
        </div>
        <div>
          <label className='text-2xl'>Date:</label> {/* 2x larger label */}
          <input
            type="date"
            name="date"
            value={newTodo.date}
            onChange={handleInputChange}
            className='border border-black px-2 py-1 w-full' // 1px solid black border
          />
        </div>
        <div>
          <label htmlFor="image" className='text-2xl'>Set an icon (optional)</label> {/* 2x larger label */}
          <input
            type="text"
            name="image"
            value={newTodo.image}
            onChange={handleInputChange}
            placeholder='URL'
            className='border border-black px-2 py-1 w-full' // 1px solid black border
          />
        </div>
        <button
          type="button"
          onClick={handleAddTodo}
          className='bg-blue-500 text-white px-4 py-2 rounded mt-2'
        >
          Add Todo
        </button>
      </form>

      <ul className='space-y-2 mt-4'>
        {todos.map((todo) => (
          <li key={todo.id} className='mt-6 p-4 border border-gray-300 rounded'>
            <div>
              <h2 className='text-xl font-bold mb-2'>{todo.title}</h2>
              <p><strong>Text:</strong> {todo.text}</p>
              <p><strong>Date:</strong> {todo.date}</p>

              {/* Display the image for the todo if present */}
              {todo.image && (
                <div>
                  <img src={todo.image} alt={todo.title} className="w-50 h-50" />
                </div>
              )}

              {/* Checkbox for toggling completion */}
              <div className='mt-4'>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  id={`completed-${todo.id}`}
                  className='mr-2'
                />
                <label htmlFor={`completed-${todo.id}`} className='cursor-pointer'>
                  {todo.completed ? 'Completed' : 'Pending'}
                </label>
              </div>

              {/* Remove button */}
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                className='bg-red-500 text-white px-2 py-1 rounded mt-2'
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
