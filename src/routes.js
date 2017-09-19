
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import ActivitiesList from './Containers/ActivitiesList'

export default () => {
  const routes = (
    <Route path="activity">
      <IndexRoute component={ActivitiesList} />
    </Route>
  );
  return routes;
};
