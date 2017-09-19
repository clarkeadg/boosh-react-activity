'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ActivitiesList = require('./Containers/ActivitiesList');

var _ActivitiesList2 = _interopRequireDefault(_ActivitiesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: 'activity' },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _ActivitiesList2.default })
  );
  return routes;
};