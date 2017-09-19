
const ActivitiesCollection = require('./Collections/ActivitiesCollection');
const ActivityActions      = require('./Actions/Creators');
const Activity             = require('./Components/Activity/Activity');
const ActivitySaga         = require('./Sagas/ActivitySaga');
const ActivityApi          = require('./Services/ActivityApi');
const ActivityReducer      = require('./Reducers/ActivityReducer');
const ActivityRoutes       = require('./routes');

module.exports = {
  ActivitiesCollection:    ActivitiesCollection.default,
  ActivityActions:         ActivityActions.default,
  Activity:                Activity.default,
  ActivitySaga:            ActivitySaga.default,
  ActivityApi:             ActivityApi.default,
  ActivityReducer:         ActivityReducer.default,
  ActivityRoutes:          ActivityRoutes.default
}
