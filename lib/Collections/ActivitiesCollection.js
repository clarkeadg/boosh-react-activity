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

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _ActivitySelector = require('../Selectors/ActivitySelector');

var _reactFoundation = require('react-foundation');

var _booshReactComponents = require('boosh-react-components');

var _Activity = require('../Components/Activity/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Selectors */
var pageId = 1;

/* Sagas */
//import GetActivitySaga from '../../Sagas/Preloaders/GetActivitySaga'

/* Components */


/* Actions */

/* React */

var ActivitiesCollection = function (_React$Component) {
  (0, _inherits3.default)(ActivitiesCollection, _React$Component);

  function ActivitiesCollection() {
    (0, _classCallCheck3.default)(this, ActivitiesCollection);
    return (0, _possibleConstructorReturn3.default)(this, (ActivitiesCollection.__proto__ || (0, _getPrototypeOf2.default)(ActivitiesCollection)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActivitiesCollection, [{
    key: 'getData',
    value: function getData(pageNumber) {
      var _props = this.props,
          user_id = _props.user_id,
          item_type = _props.item_type,
          item_id = _props.item_id;

      var Meta = {
        query: {
          page: pageNumber
        },
        path: this.props.path || "/activity/"
      };
      if (user_id) Meta.query.user_id = user_id;
      if (item_type) Meta.query.item_type = item_type;
      if (item_id) Meta.query.item_id = item_id;

      this.props.dispatch(_Creators2.default.getActivityAttempt(Meta));
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      this.getData(pageId++);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pageNumber = this.props.pageNumber;

      this.getData(pageNumber);
      pageId++;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.pageNumber !== this.props.pageNumber) {
        this.getData(newProps.pageNumber);
      }
    }
  }, {
    key: 'renderMoreButton',
    value: function renderMoreButton(count, len) {
      var _this2 = this;

      if (count > len) {
        return _react2.default.createElement(
          _reactFoundation.Button,
          { onClick: function onClick() {
              _this2.loadMore();
            } },
          'Load More'
        );
      }
      return false;
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading(loading) {
      if (loading) {
        return _react2.default.createElement(_booshReactComponents.Loading, null);
      }
      return false;
    }
  }, {
    key: 'renderActivities',
    value: function renderActivities(loading, activities) {
      var user_id = this.props.user_id;


      return _react2.default.createElement(
        _reactFoundation.Row,
        { upOnSmall: 1 },
        activities.items.map(function (item, id) {
          return _react2.default.createElement(
            _reactFoundation.Column,
            { key: id },
            _react2.default.createElement(_Activity2.default, { activity: item, user_id: user_id })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          activities = _props2.activities,
          pageNumber = _props2.pageNumber,
          path = _props2.path,
          count = _props2.count,
          loading = _props2.loading;


      console.log('RENDER ACTIVITIES', activities);

      return _react2.default.createElement(
        'div',
        { className: 'activities' },
        this.renderActivities(loading, activities),
        _react2.default.createElement(_booshReactComponents.Pagination, { path: path, pageNumber: pageNumber, count: activities.count })
      );
    }
  }]);
  return ActivitiesCollection;
}(_react2.default.Component);

ActivitiesCollection.propTypes = {
  loading: _react2.default.PropTypes.bool,
  activities: _react2.default.PropTypes.object,
  pageNumber: _react2.default.PropTypes.number
};

ActivitiesCollection.defaultProps = {
  loading: true,
  activities: {},
  pageNumber: 1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.activities.attempting,
    activities: (0, _ActivitySelector.getActivitiesCollection)(state, props)
  };
};

/*function preload(params, req) {
  return [
    [GetActivitySaga, {}]
  ];
}
Activity.preload = preload;*/

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ActivitiesCollection);