import { SELECT } from './constant';
import data from './data';

const initialState = {
  all: data,
  visiableList: []
};

export default function markdown(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        visiableList: state.all.filter((item) => item.meta === action.payload)
      };
    default:
      return state;
  }
}
