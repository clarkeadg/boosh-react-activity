
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Actions */
import Actions from '../Actions/Creators'

/* Selectors */
import { getActivitiesCollection } from '../Selectors/ActivitySelector'

/* Sagas */
//import GetActivitySaga from '../../Sagas/Preloaders/GetActivitySaga'

/* Components */
import { Row, Column, Button } from 'react-foundation';
import { Pagination, Portlet, Loading } from 'boosh-react-components'
import Activity from '../Components/Activity/Activity'

let pageId = 1;

class ActivitiesCollection extends React.Component {

  getData(pageNumber) {
    let { user_id, item_type, item_id } = this.props;
    let Meta = {
      query: {
        page: pageNumber
      },
      path: this.props.path || "/activity/"
    }
    if (user_id)   Meta.query.user_id = user_id;
    if (item_type) Meta.query.item_type = item_type;
    if (item_id)   Meta.query.item_id = item_id;

    this.props.dispatch(Actions.getActivityAttempt(Meta));
  }

  loadMore() {
    this.getData(pageId++)
  }

  componentDidMount() {
    let { pageNumber } = this.props
    this.getData(pageNumber)
    pageId++;
  }

  componentWillReceiveProps (newProps) {
    if (newProps.pageNumber !== this.props.pageNumber) {
      this.getData(newProps.pageNumber)
    }
  }

  renderMoreButton(count, len) {
    if(count > len) {
      return (<Button onClick={()=>{this.loadMore()}}>Load More</Button>)
    }
    return false;
  }

  renderLoading(loading) {
    if (loading) {
      return (<Loading/>)
    }
    return false;
  }

  renderActivities(loading, activities) {
    let { user_id } = this.props;

    return (
      <Row upOnSmall={1}>
        {activities.items.map((item, id) => {
          return (
            <Column key={id}>
              <Activity activity={item} user_id={user_id}/>
            </Column>
          )
        })}
        { /* this.renderLoading(loading) */ }
      </Row>
    )
  }

  render() {

    let { activities, pageNumber, path, count, loading } = this.props;

    console.log('RENDER ACTIVITIES', activities)

    return (
      <div className="activities">        
        { this.renderActivities(loading, activities) } 
        <Pagination path={path} pageNumber={pageNumber} count={activities.count}/>       
        { /* this.renderMoreButton(count, activities.count) */ }
      </div>
    );
  }

}

ActivitiesCollection.propTypes = {
  loading: React.PropTypes.bool,
  activities: React.PropTypes.object,
  pageNumber: React.PropTypes.number
}

ActivitiesCollection.defaultProps = {
  loading: true,
  activities: {},
  pageNumber: 1
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.activities.attempting,
    activities: getActivitiesCollection(state, props)
  }
}

/*function preload(params, req) {
  return [
    [GetActivitySaga, {}]
  ];
}
Activity.preload = preload;*/

export default connect(mapStateToProps)(ActivitiesCollection)

