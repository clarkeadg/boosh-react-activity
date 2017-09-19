'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _booshReactUsers = require('boosh-react-users');

var _ActivitySchema = require('../Schemas/ActivitySchema');

var _ActivitySchema2 = _interopRequireDefault(_ActivitySchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (api) {
  var _marked = [attemptGetActivity, attemptAddActivity, watchGetActivityAttempt, watchAddActivityAttempt, attemptUpdateActivity, watchUpdateActivityAttempt].map(_regenerator2.default.mark);

  function attemptGetActivity(meta) {
    var query, path, response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetActivity$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/activity/";

            // make the call to the api

            _context.next = 4;
            return (0, _effects.call)(api.getActivity, query);

          case 4:
            response = _context.sent;


            console.log('GOT ACTIVITY', response.data);

            // success?

            if (!(response && response.ok)) {
              _context.next = 18;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_ActivitySchema2.default));

            if (!payload.result.length) {
              payload.entities.activity = {};
              //payload.entities.users = {};
            }
            payload.query = query;
            payload.path = path;
            payload.count = count;

            //console.log('NORMALIZED DATA', payload)

            _context.next = 16;
            return (0, _effects.put)(_Creators2.default.getActivitySuccess(payload));

          case 16:
            _context.next = 20;
            break;

          case 18:
            _context.next = 20;
            return (0, _effects.put)(_Creators2.default.getActivityFailure(response.data));

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  function attemptAddActivity(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptAddActivity$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.call)(api.addActivity, meta);

          case 2:
            response = _context2.sent;


            console.log('ADD ACTIVITY RESPONSE', response, meta);

            // success?

            if (!(response && response.ok)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return (0, _effects.put)(_Creators2.default.getActivityAttempt({ item_type: meta.item_type, item_id: meta.item_id }));

          case 7:
            _context2.next = 11;
            break;

          case 9:
            _context2.next = 11;
            return (0, _effects.put)(_Creators2.default.addActivityFailure(response.data));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function watchGetActivityAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchGetActivityAttempt$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!true) {
              _context3.next = 9;
              break;
            }

            _context3.next = 3;
            return (0, _effects.take)(_Types2.default.GET_ACTIVITY_REQUEST);

          case 3:
            _ref = _context3.sent;
            meta = _ref.meta;
            _context3.next = 7;
            return (0, _effects.call)(attemptGetActivity, meta);

          case 7:
            _context3.next = 0;
            break;

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  function watchAddActivityAttempt() {
    var _ref2, _meta;

    return _regenerator2.default.wrap(function watchAddActivityAttempt$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!true) {
              _context4.next = 9;
              break;
            }

            _context4.next = 3;
            return (0, _effects.take)(_Types2.default.ADD_ACTIVITY_REQUEST);

          case 3:
            _ref2 = _context4.sent;
            _meta = _ref2.meta;
            _context4.next = 7;
            return (0, _effects.call)(attemptAddActivity, _meta);

          case 7:
            _context4.next = 0;
            break;

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function attemptUpdateActivity(meta) {
    var query, response;
    return _regenerator2.default.wrap(function attemptUpdateActivity$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:

            console.log('attemptUpdateActivity', meta);

            query = meta.meta;

            // make the call to the api

            _context5.next = 4;
            return (0, _effects.call)(api.updateActivity, query.id, { read: query.read });

          case 4:
            response = _context5.sent;


            console.log('UPDATE ACTIVITY RESPONSE', response.data);

            // success?

            if (!(response && response.ok)) {
              _context5.next = 11;
              break;
            }

            _context5.next = 9;
            return (0, _effects.put)(_booshReactUsers.UsersActions.getUserStatusAttempt({
              id: query.user_id
            }));

          case 9:
            _context5.next = 11;
            break;

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this);
  }

  function watchUpdateActivityAttempt() {
    return _regenerator2.default.wrap(function watchUpdateActivityAttempt$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _reduxSaga.takeEvery)(_Types2.default.UPDATE_ACTIVITY_REQUEST, attemptUpdateActivity);

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  return {
    watchGetActivityAttempt: watchGetActivityAttempt,
    watchAddActivityAttempt: watchAddActivityAttempt,
    watchUpdateActivityAttempt: watchUpdateActivityAttempt,
    attemptGetActivity: attemptGetActivity,
    attemptAddActivity: attemptAddActivity,
    attemptUpdateActivity: attemptUpdateActivity
  };
};

/* SCHEMAS */