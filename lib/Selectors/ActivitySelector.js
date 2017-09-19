'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisibleActivity = exports.getActivitiesCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allActivity = function allActivity(state, props) {
  return state.activities;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'activity';
};

/* Export */

var getActivitiesCollection = exports.getActivitiesCollection = (0, _reselect.createSelector)([allActivity, path], function (activity, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!activity.collections[key]) return collection;
  collection.count = activity.collections[key].count;
  collection.items = activity.collections[key].result.map(function (id) {
    return activity.entities[id];
  });
  return collection;
});

var getVisibleActivity = exports.getVisibleActivity = (0, _reselect.createSelector)([allActivity], function (activity) {
  return activity.result.map(function (id) {
    return activity.entities[id];
  });
});