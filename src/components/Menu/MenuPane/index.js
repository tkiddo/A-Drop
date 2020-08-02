import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const MenuPane = (props) => {
  const { name, dir } = props;
  return (
    <Link className="menu-pane" to={`/${dir}`}>
      <span>{name}</span>
      {/* <div className="menu-hover-modal">
        <span>{info}</span>
      </div> */}
    </Link>
  );
};

export default React.memo(MenuPane);
