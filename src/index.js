import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';
import { SubredditProvider } from './contexts/SubredditContext';
import { PostProvider } from './contexts/PostContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SubredditProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </SubredditProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
