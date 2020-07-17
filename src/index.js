// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'highlight.js/styles/github-gist.css';
// eslint-disable-next-line no-unused-vars
import { Provider } from 'react-redux';
import App from './app';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // eslint-disable-next-line comma-dangle
  document.getElementById('root')
);
