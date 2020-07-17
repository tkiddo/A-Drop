// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import './app.scss';

import { add, minus, asyncAdd } from './store/count/action';

import MdBoxModel from './md/CSS/box-model.md';

function App() {
  return (
    <div className="app">
      <MdBoxModel />
    </div>
  );
}

const mapStateToProps = ({ count }) => ({ count });
const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch(add()),
  minus: () => dispatch(minus()),
  asyncAdd: () => dispatch(asyncAdd())
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
