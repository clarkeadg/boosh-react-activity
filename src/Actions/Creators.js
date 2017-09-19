import Types from './Types'

/* ACTIVITY */
const getActivityAttempt = (meta) => ({ type: Types.GET_ACTIVITY_REQUEST, meta })
const getActivitySuccess = (payload) => ({ type: Types.GET_ACTIVITY_SUCCESS, payload })
const getActivityFailure = (errorCode) => ({ type: Types.GET_ACTIVITY_FAILURE, errorCode })

const updateActivityAttempt = (meta) => ({ type: Types.UPDATE_ACTIVITY_REQUEST, meta })
const updateActivitySuccess = (payload) => ({ type: Types.PDATE_ACTIVITY_SUCCESS, payload })
const updateActivityFailure = (errorCode) => ({ type: Types.PDATE_ACTIVITY_FAILURE, errorCode })

const addActivityAttempt = (meta) => ({ type: Types.ADD_ACTIVITY_REQUEST, meta })
const addActivityFailure = (errorCode) => ({ type: Types.ADD_ACTIVITY_FAILURE, errorCode })

const deleteActivityAttempt = (meta) => ({ type: Types.DELETE_ACTIVITY_REQUEST, meta })
const deleteActivityeFailure = (errorCode) => ({ type: Types.DELETE_ACTIVITY_FAILURE, errorCode })


/**
 Makes available all the action creators we've created.
 */
export default {

  getActivityAttempt,
  getActivitySuccess,
  getActivityFailure,

  updateActivityAttempt,
  updateActivitySuccess,
  updateActivityFailure,

  addActivityAttempt,
  addActivityFailure,

  deleteActivityAttempt,
  deleteActivityeFailure
}
