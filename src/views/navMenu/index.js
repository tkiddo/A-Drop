import React from 'react';
import './index.scss';
import MenuContainer from '../../components/Menu';
import MenuPane from '../../components/Menu/MenuPane';

const NavMenu = () => (
  <>
    <h3 className="menu-title">A Drop</h3>
    <MenuContainer>
      <MenuPane />
      <MenuPane />
      <MenuPane />
      <MenuPane />
    </MenuContainer>
  </>
);

export default React.memo(NavMenu);
