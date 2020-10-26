import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';
import { SubredditProvider } from './contexts/SubredditContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SubredditProvider>
        <App />
      </SubredditProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
