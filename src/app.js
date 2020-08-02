// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import TopBar from './components/TopBar';
import MainContainer from './components/MainContainer';
import AppRoutes from './route/appRoutes';

function App() {
  return (
    <>
      <TopBar />
      <MainContainer>
        <AppRoutes />
      </MainContainer>
    </>
  );
}

export default React.memo(App);
