import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './reset.css';
import './index.css';
import routes from './routes.jsx';

const router = createBrowserRouter(routes);

// Render icons
import iconSprite from './assets/icons.svg?raw';
document.body.insertAdjacentHTML('afterbegin', iconSprite);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
