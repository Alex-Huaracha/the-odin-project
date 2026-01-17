import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Render icons
import iconSprite from './assets/icons.svg?raw';
document.body.insertAdjacentHTML('afterbegin', iconSprite);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
