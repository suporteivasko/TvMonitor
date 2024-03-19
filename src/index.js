import React from 'react';
import ReactDOM from 'react-dom/client';  // Altere a importação aqui

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import  MainProvider  from './contexts/MainProvider'




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MainProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>

  </MainProvider>

);

reportWebVitals();


