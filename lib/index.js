'use strict';

var ActivitiesCollection = require('./Collections/ActivitiesCollection');
var ActivityActions = require('./Actions/Creators');
var Activity = require('./Components/Activity/Activity');
var ActivitySaga = require('./Sagas/ActivitySaga');
var ActivityApi = require('./Services/ActivityApi');
var ActivityReducer = require('./Reducers/ActivityReducer');
var ActivityRoutes = require('./routes');

module.exports = {
  ActivitiesCollection: ActivitiesCollection.default,
  ActivityActions: ActivityActions.default,
  Activity: Activity.default,
  ActivitySaga: ActivitySaga.default,
  ActivityApi: ActivityApi.default,
  ActivityReducer: ActivityReducer.default,
  ActivityRoutes: ActivityRoutes.default
};