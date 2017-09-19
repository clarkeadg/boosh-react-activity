'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ACTIVITY */
var getActivityAttempt = function getActivityAttempt(meta) {
  return { type: _Types2.default.GET_ACTIVITY_REQUEST, meta: meta };
};
var getActivitySuccess = function getActivitySuccess(payload) {
  return { type: _Types2.default.GET_ACTIVITY_SUCCESS, payload: payload };
};
var getActivityFailure = function getActivityFailure(errorCode) {
  return { type: _Types2.default.GET_ACTIVITY_FAILURE, errorCode: errorCode };
};

var updateActivityAttempt = function updateActivityAttempt(meta) {
  return { type: _Types2.default.UPDATE_ACTIVITY_REQUEST, meta: meta };
};
var updateActivitySuccess = function updateActivitySuccess(payload) {
  return { type: _Types2.default.PDATE_ACTIVITY_SUCCESS, payload: payload };
};
var updateActivityFailure = function updateActivityFailure(errorCode) {
  return { type: _Types2.default.PDATE_ACTIVITY_FAILURE, errorCode: errorCode };
};

var addActivityAttempt = function addActivityAttempt(meta) {
  return { type: _Types2.default.ADD_ACTIVITY_REQUEST, meta: meta };
};
var addActivityFailure = function addActivityFailure(errorCode) {
  return { type: _Types2.default.ADD_ACTIVITY_FAILURE, errorCode: errorCode };
};

var deleteActivityAttempt = function deleteActivityAttempt(meta) {
  return { type: _Types2.default.DELETE_ACTIVITY_REQUEST, meta: meta };
};
var deleteActivityeFailure = function deleteActivityeFailure(errorCode) {
  return { type: _Types2.default.DELETE_ACTIVITY_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getActivityAttempt: getActivityAttempt,
  getActivitySuccess: getActivitySuccess,
  getActivityFailure: getActivityFailure,

  updateActivityAttempt: updateActivityAttempt,
  updateActivitySuccess: updateActivitySuccess,
  updateActivityFailure: updateActivityFailure,

  addActivityAttempt: addActivityAttempt,
  addActivityFailure: addActivityFailure,

  deleteActivityAttempt: deleteActivityAttempt,
  deleteActivityeFailure: deleteActivityeFailure
};