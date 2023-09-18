import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import store from 'src/store/store.ts';
import Router from 'src/routes/Router';

import { createRoot } from 'react-dom/client';

const rootNode = document.getElementById('root');
if (!rootNode) throw new Error('Root node not found');
const root = createRoot(rootNode);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
