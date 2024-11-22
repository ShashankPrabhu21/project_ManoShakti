import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure App component is correctly imported
import './index.css'; // Ensure the path to your CSS file is correct
import { Provider } from 'react-redux';
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('app')); // Ensure 'app' matches the id in index.html
root.render(
  <React.StrictMode>
    <Provider store={store}><App/></Provider>
  </React.StrictMode>
);
