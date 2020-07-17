import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import count from './count/reducer';

const store = createStore(
  combineReducers({ count }),
  // eslint-disable-next-line comma-dangle
  applyMiddleware(thunk, logger)
);

export default store;
