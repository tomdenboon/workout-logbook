import React from 'react';
import './index.css';

import { createRoot } from 'react-dom/client';
import App from 'src/App';

const rootNode = document.getElementById('root');
if (!rootNode) throw new Error('Root node not found');
const root = createRoot(rootNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
