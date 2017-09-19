import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

import { UsersActions } from 'boosh-react-users'

/* SCHEMAS */
import ActivitySchema from '../Schemas/ActivitySchema'

export default (api) => {

  function * attemptGetActivity (meta) {

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/activity/"; 

    // make the call to the api
    const response = yield call(api.getActivity, query)

    console.log('GOT ACTIVITY',response.data)

    // success?
    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(ActivitySchema));
      if (!payload.result.length) {
        payload.entities.activity = {};
        //payload.entities.users = {};
      }
      payload.query = query;
      payload.path = path;
      payload.count = count;
      
      //console.log('NORMALIZED DATA', payload)

      yield put(Actions.getActivitySuccess(payload))
      
    } else {
      yield put(Actions.getActivityFailure(response.data))
    }
  }

  function * attemptAddActivity(meta) {

    // make the call to the api
    const response = yield call(api.addActivity, meta)

    console.log('ADD ACTIVITY RESPONSE', response, meta)

    // success?
    if (response && response.ok) {
      yield put(Actions.getActivityAttempt({item_type: meta.item_type, item_id: meta.item_id}));
    } else {
      yield put(Actions.addActivityFailure(response.data))
    }
  }

  function * watchGetActivityAttempt () {
    //yield takeEvery(Types.GET_FAVORITE_REQUEST, attemptGetFavorites)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_ACTIVITY_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetActivity, meta)
    }
  }

  function * watchAddActivityAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.ADD_ACTIVITY_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptAddActivity, meta)
    }
  }

  function * attemptUpdateActivity (meta) {

    console.log('attemptUpdateActivity', meta)

    let query = meta.meta; 

    // make the call to the api
    const response = yield call(api.updateActivity, query.id, { read: query.read });

    console.log('UPDATE ACTIVITY RESPONSE',response.data)

    // success?
    if (response && response.ok) {

      yield put(UsersActions.getUserStatusAttempt({
        id: query.user_id
      }));
      
    } else {
      //yield put(Actions.updateNotificationsFailure(response.data))
    }
  }

  function * watchUpdateActivityAttempt () {
    yield takeEvery(Types.UPDATE_ACTIVITY_REQUEST, attemptUpdateActivity)
  }

  return {
    watchGetActivityAttempt,
    watchAddActivityAttempt,
    watchUpdateActivityAttempt,
    attemptGetActivity,
    attemptAddActivity,
    attemptUpdateActivity
  }
}
