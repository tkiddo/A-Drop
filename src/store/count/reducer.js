import { ADD, MINUS } from './constant';

const initialState = {
  number: 0,
};

export default function count(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        number: state.number + 1,
      };
    case MINUS:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
