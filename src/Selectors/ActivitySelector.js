import { createSelector } from 'reselect'

/* Private */

const allActivity = (state, props) => state.activities

const path = (state, props) => props.path ? props.path.replace(/\//g,'') : 'activity'

/* Export */

export const getActivitiesCollection = createSelector(
  [ allActivity, path ],
  ( activity, key ) => {
    let collection = {
      items: [],
      count: 0
    }
    if (!activity.collections[key]) return collection;
    collection.count = activity.collections[key].count;
    collection.items = activity.collections[key].result.map((id) => {
      return activity.entities[id]
    })
    return collection;
  }
)

export const getVisibleActivity = createSelector(
  [ allActivity ],
  ( activity ) => {
    return activity.result.map((id) => {
      return activity.entities[id]
    })
  }
)
