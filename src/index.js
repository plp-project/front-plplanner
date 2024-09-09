import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { CategoryProvider } from './contexts/CategoryContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <CategoryProvider>
    <TaskProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TaskProvider>
  </CategoryProvider>
</React.StrictMode>
);

reportWebVitals();
