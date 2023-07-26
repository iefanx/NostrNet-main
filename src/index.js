// Import the required modules
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Use createRoot instead of ReactDOM.render
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render your app using createRoot
root.render(<App />);
