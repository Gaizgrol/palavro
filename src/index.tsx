import React from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = document.getElementById('root');

export interface NumberDict<T> {
  [key: number]: T
}

Modal.setAppElement( root! );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
