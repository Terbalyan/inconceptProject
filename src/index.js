import App from './App';
import React from 'react';
import store from './app/store';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);