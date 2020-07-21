import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const ListItem = (props) => {
  const { title, description, path } = props;
  return (
    <Link to={`md/${path}`} className="item-link">
      <div className="item-title"><span>{title}</span></div>
      <div className="item-desc"><span>{description}</span></div>
    </Link>
  );
};

export default ListItem;
