'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var ActivitySchema = new _normalizr.Schema('activity', { idAttribute: 'id' });

var UserSchema = new _normalizr.Schema('users', { idAttribute: 'id' });

ActivitySchema.define({
  //user: UserSchema
});

exports.default = ActivitySchema;