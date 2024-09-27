import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'; // Import Provider
import { createRoot } from 'react-dom/client';
import todoReducer from './store/reducers/todoReducer.js';
import App from './App.js';
import './index.css'
// Set up the store
const store = configureStore({
  reducer: todoReducer
});

// Grab the container
const container = document.getElementById('root');
const root = createRoot(container);

// Wrap App in the Provider and pass the store
root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
