// main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Ensure there's a div with id="root" in your HTML file
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a <div id='root'></div> in your index.html.");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
