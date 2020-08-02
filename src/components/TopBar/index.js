import React from 'react';
import './index.scss';
import logo from '../../assets/images/logo.png';

const TopBar = () => (
  <div className="top-bar-container">
    <div className="top-bar">
      <img src={logo} alt="logo" className="logo" />
      <span className="logo-text">A Drop</span>
      <div className="top-nav">
        <div className="top-nav-item">
          <a href="https://github.com/justforfunmy">更多开源项目</a>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(TopBar);
