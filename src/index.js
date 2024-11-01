// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can include a default CSS file
import App from './App'; // Import your App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
