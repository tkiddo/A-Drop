import React from 'react';
import './index.scss';

const MenuPane = () => (
  <div className="menu-pane">
    <span>MenuPane</span>
    <div className="menu-hover-modal">
      <span>some detail</span>
    </div>
  </div>
);

export default React.memo(MenuPane);
