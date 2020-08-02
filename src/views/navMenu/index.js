import React from 'react';
import './index.scss';
import MenuContainer from '../../components/Menu';
import MenuPane from '../../components/Menu/MenuPane';

const NavMenu = () => {
  const menu = [
    {
      dir: 'JavaScript',
      name: 'Javascript相关',
      info: 'JavaScript,TypeScript,React ...'
    },
    {
      dir: 'CSS',
      name: 'CSS相关',
      info: 'Styles,Scss,Less,Stylus ...'
    },
    {
      dir: 'Tools',
      name: '开发工具',
      info: 'Eslint,Webpack,Git ...'
    },
    {
      dir: 'Others',
      name: '其他Web相关',
      info: 'Ajax,Http,Html ...'
    }
  ];
  return (
    <>
      <h3 className="menu-title">A Drop</h3>
      {/* <h5 className="menu-sub-title">Pay attention to learning everywhere.</h5> */}
      <MenuContainer>
        {menu.map((item) => (
          <MenuPane name={item.name} info={item.info} key={item.name} dir={item.dir} />
        ))}
      </MenuContainer>
    </>
  );
};

export default React.memo(NavMenu);
