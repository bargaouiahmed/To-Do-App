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
    <div className='bgblk text-gray-100'> {/* Dark background and light text */}
      <div className='font-serif mx-20 '>
        <div className='text-center'>
          <h1 className='text-3xl text-white'>Todo List</h1> {/* White heading for contrast */}
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className='mx-20'>
            <label className='text-2xl text-gray-200'>Title:</label> {/* Light label */}
            <input
              type="text"
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              placeholder="Title"
              className='border border-blue-600 bg-gray-700 text-gray-100 rounded-md px-2 py-1 w-full' // Dark input with light text
            />
          </div>
          <div>
            <label className='text-2xl text-gray-200'>Text:</label> {/* Light label */}
            <textarea
              name="text"
              value={newTodo.text}
              onChange={handleInputChange}
              placeholder="Todo Text"
              rows="50"
              cols="50"
              className='border border-blue-500 bg-gray-700 text-gray-100 rounded-md px-2 py-1 w-full h-20'
            ></textarea>
          </div>
          <div>
            <label className='text-2xl text-gray-200'>Date:</label> {/* Light label */}
            <input
              type="date"
              name="date"
              value={newTodo.date}
              onChange={handleInputChange}
              className='border border-blue-500 bg-gray-700 text-gray-100 px-2 py-1'
            />
          </div>
          <div>
            <label htmlFor="image" className='text-2xl text-gray-200'>Set an icon (optional)</label>
            <input
              type="text"
              name="image"
              value={newTodo.image}
              onChange={handleInputChange}
              placeholder='URL'
              className='border border-blue-500 bg-gray-700 text-gray-100 px-2 py-1 w-full rounded-xl'
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
            <li key={todo.id} className='mt-6 p-4 border border-gray-600 bg-gray-800 rounded'> {/* Dark background for each item */}
              <div>
                <h2 className='text-xl font-bold text-gray-200 mb-2'>{todo.title}</h2> {/* Light text */}
                <p><strong>Text:</strong> {todo.text}</p>
                <p><strong>Date:</strong> {todo.date}</p>

                {/* Display the image for the todo if present */}
                {todo.image && (
                  <div>
                    <img src={todo.image} alt={todo.title} height="200px" width="200px" />
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
    </div>
  );
};

export default TodoList;
