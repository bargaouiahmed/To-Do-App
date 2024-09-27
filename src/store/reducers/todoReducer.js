// src/store/reducers/todoReducer.js

// Utility function to save todos to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (error) {
    console.error('Could not save state', error);
  }
};

// Utility function to load todos from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return { todos: [] }; // Return initial state structure
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load state', error);
    return { todos: [] }; // Return initial state structure
  }
};

// Initial State
const initialState = loadFromLocalStorage();

// Action Types
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Reducer Function
export default function todoReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case ADD_TODO:
      newState = {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            title: action.payload.title,
            text: action.payload.text,
            date: action.payload.date,
            image: action.payload.image, // Ensure image is saved
            completed: false,
          },
        ],
      };
      saveToLocalStorage(newState); // Save to localStorage after adding a todo
      return newState;

    case REMOVE_TODO:
      newState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
      saveToLocalStorage(newState); // Save to localStorage after removing a todo
      return newState;

    case TOGGLE_TODO:
      newState = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      saveToLocalStorage(newState); // Save to localStorage after toggling a todo
      return newState;

    default:
      return state; // Ensure the state is returned unchanged
  }
}

// Action Creators
export const addTodo = (id, title, text, date, image) => ({
  type: ADD_TODO,
  payload: { id, title, text, date, image },
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});
