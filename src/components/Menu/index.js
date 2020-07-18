import React from 'react';
import './index.scss';

// eslint-disable-next-line react/destructuring-assignment
const Menu = (props) => <div className="menu-container">{props.children}</div>;

export default React.memo(Menu);
