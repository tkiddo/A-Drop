import { ADD, MINUS } from './constant';

export const add = (payload) => ({
  type: ADD,
  payload,
});

export const minus = (payload) => ({
  type: MINUS,
  payload,
});

export const asyncAdd = () => (dispatch) => {
  setTimeout(() => {
    dispatch(add());
  }, 3000);
};
