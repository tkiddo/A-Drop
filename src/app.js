// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import TopBar from './components/TopBar';
import MainContainer from './components/MainContainer';
import AppRoutes from './route/appRoutes';

function App() {
  return (
    <div>
      <TopBar />
      <MainContainer>
        <AppRoutes />
      </MainContainer>
    </div>
  );
}

export default React.memo(App);
