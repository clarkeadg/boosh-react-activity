
/* React */
import React from 'react'

/* Components */
import { Row, Column } from 'react-foundation'
import { Portlet } from 'boosh-react-components'
import { Link } from 'react-router'
import ActivitiesCollection from '../Collections/ActivitiesCollection'

class List extends React.Component {

  render() {
    return (
      <div className="page page-error-404">
        <Row className="display">
          <Column small={12}>
            <Portlet title={'List'} items={
              <ActivitiesCollection/>
            } />
          </Column>
        </Row>
      </div>
    );
  }

}

export default List;
