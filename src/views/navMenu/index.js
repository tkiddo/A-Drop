import React from 'react';
import './index.scss';
import MenuContainer from '../../components/Menu';
import MenuPane from '../../components/Menu/MenuPane';

const NavMenu = () => {
  const menu = [
    {
      name: 'JavaScript',
      info: 'JavaScript,TypeScript,React ...'
    },
    {
      name: 'CSS',
      info: 'Styles,Scss,Less,Stylus ...'
    },
    {
      name: 'Tools',
      info: 'Eslint,Webpack,Git ...'
    },
    {
      name: 'Others',
      info: 'Ajax,Http,Html ...'
    }
  ];
  return (
    <>
      <h3 className="menu-title">A Drop</h3>
      <h5 className="menu-sub-title">Pay attention to learning everywhere.</h5>
      <MenuContainer>
        {menu.map((item) => (
          <MenuPane name={item.name} info={item.info} key={item.name} />
        ))}
      </MenuContainer>
    </>
  );
};

export default React.memo(NavMenu);
