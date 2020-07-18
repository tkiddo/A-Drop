import React from 'react';
import './index.scss';

const MainContainer = (props) => (
  // eslint-disable-next-line react/destructuring-assignment
  <div className="main-container">{props.children}</div>
);

export default React.memo(MainContainer);
