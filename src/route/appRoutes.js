import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import NavMenu from '../views/navMenu';
import ListContainer from '../components/ListContainer';
import MdContainer from '../components/MdContainer';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <NavMenu />
      </Route>
      <Route path="/md/:path" component={MdContainer} />
      <Route path="/:filter" component={ListContainer} />
    </Switch>
  </Router>
);

export default AppRouter;
