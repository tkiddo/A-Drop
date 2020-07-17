import React from 'react';
import './index.scss';

// eslint-disable-next-line react/destructuring-assignment
const MdContainer = (props) => <div>{props.children}</div>;

export default React.memo(MdContainer);
