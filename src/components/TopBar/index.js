import React from 'react';
import './index.scss';
import logo from '../../assets/images/logo.png';

const TopBar = () => (
  <div className="top-bar">
    <img src={logo} alt="logo" className="logo" />
    <span className="logo-text">A Drop</span>
  </div>
);

export default React.memo(TopBar);
