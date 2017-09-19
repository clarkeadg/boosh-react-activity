
/* React */
import React from 'react';
import { connect } from 'react-redux'

/* Components */
import { GetUser, getUserById } from 'boosh-react-users'
import { getMe } from 'boosh-react-auth'
import ActivityActions from '../../Actions/Creators'

class Activity extends React.Component {

  addViewed() {
    let { activity, time, me } = this.props;
    if (!activity.id || !time || !me.id) return false;
    if (activity.read) return false;    

    if (activity.item_type == "profile_view" && activity.item_id == me.id) {
      console.log('ADD VIEWED', activity.id, time)
      this.props.dispatch(ActivityActions.updateActivityAttempt({
        user_id: me.id,
        id: activity.id,
        read: time
      })) 
    }   
       
  }

  componentDidMount() {
    this.addViewed();
  }

  componentWillReceiveProps (newProps) {
    this.addViewed();
  }

  render() {

    let { activity, user_id } = this.props;

    //console.log('ACTIVITY', activity)

    switch(activity.item_type) {
      case 'profile_view':
        if (user_id) {
          return (
            <div className={'activity activity-profile_view'} >
              <GetUser user_id={activity.item_id} meta={true}/>
              { /* <span className="copy">you viewed profile.</span> */ }
            </div>
          )
        }
        return (
          <div className={'activity activity-profile_view'} >
            <GetUser user_id={activity.user_id} meta={true}/>
            { /* <span className="copy">viewed your profile.</span> */ }
          </div>
        )
      break;      
        return false;
      break;
    }
  }

}

Activity.propTypes = {
  me: React.PropTypes.object,
  time: React.PropTypes.string
}

Activity.defaultProps = {
  me: {},
  time: null
}

const mapStateToProps = (state, props) => {
  return {
    me: getMe(state, props),
    time: state.status.time || null
  }
}

export default connect(mapStateToProps)(Activity)
