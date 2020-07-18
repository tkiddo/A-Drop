import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavMenu from '../views/navMenu';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <NavMenu />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
