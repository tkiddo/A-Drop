import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavMenu from '../views/navMenu';
import ListContainer from '../components/ListContainer';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <NavMenu />
      </Route>
      <Route path="/:filter" component={ListContainer} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
