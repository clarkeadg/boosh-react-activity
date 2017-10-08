'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _booshReactUsers = require('boosh-react-users');

var _booshReactAuth = require('boosh-react-auth');

var _Creators = require('../../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Activity = function (_React$Component) {
  (0, _inherits3.default)(Activity, _React$Component);

  function Activity() {
    (0, _classCallCheck3.default)(this, Activity);
    return (0, _possibleConstructorReturn3.default)(this, (Activity.__proto__ || (0, _getPrototypeOf2.default)(Activity)).apply(this, arguments));
  }

  (0, _createClass3.default)(Activity, [{
    key: 'addViewed',
    value: function addViewed() {
      var _props = this.props,
          activity = _props.activity,
          time = _props.time,
          me = _props.me;

      if (!activity.id || !time || !me.id) return false;
      if (activity.read) return false;

      if (activity.item_type == "profile_view" && activity.item_id == me.id) {
        console.log('ADD VIEWED', activity.id, time);
        this.props.dispatch(_Creators2.default.updateActivityAttempt({
          user_id: me.id,
          id: activity.id,
          read: time
        }));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addViewed();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.addViewed();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          activity = _props2.activity,
          user_id = _props2.user_id,
          meta = _props2.meta;

      //console.log('ACTIVITY', activity)

      switch (activity.item_type) {
        case 'profile_view':
          if (user_id) {
            return _react2.default.createElement(
              'div',
              { className: 'activity activity-profile_view' },
              _react2.default.createElement(_booshReactUsers.GetUser, { user_id: activity.item_id, meta: meta })
            );
          }
          return _react2.default.createElement(
            'div',
            { className: 'activity activity-profile_view' },
            _react2.default.createElement(_booshReactUsers.GetUser, { user_id: activity.user_id, meta: meta })
          );
          break;
          return false;
          break;
      }
    }
  }]);
  return Activity;
}(_react2.default.Component);

/* Components */

/* React */


Activity.propTypes = {
  me: _react2.default.PropTypes.object,
  time: _react2.default.PropTypes.string,
  meta: eact.PropTypes.bool
};

Activity.defaultProps = {
  me: {},
  time: null,
  meta: true
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    me: (0, _booshReactAuth.getMe)(state, props),
    time: state.status.time || null
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Activity);