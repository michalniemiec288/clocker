import React, {Component} from 'react'
import {Grid, Row, Col, Panel, Button, ButtonGroup, Well} from 'react-bootstrap'
import TimersContainer from '../Timers/'

const header = openNewProjectModal =>
  <div> Your Projects
    <Button
      style={{marginLeft: 20}}
      onClick={openNewProjectModal}>
      Add
    </Button>
  </div>

class UserProjects extends Component {
  componentDidUpdate () {
    const {fetchUserProjects, UserProjects} = this.props
    !UserProjects && fetchUserProjects()
  }
  render() {
    const {UserProjects, users, openNewProjectModal} = this.props
    return (
      <Grid className='content'>
        <Panel header={header(openNewProjectModal)} bsStyle="primary">
          {UserProjects
            ? UserProjects.map((project, i) =>
                <Panel
                  key={i}
                  header={project.name}
                  bsStyle="info">
                  <Well bsStyle='sm'>{project.description}</Well>
                  {/*<TimersContainer projectTids={project.timers} />*/}
                  {/*{users && Object.keys(project.users).map((uid, j) =>
                    <Button style={{marginLeft: 10}} bsStyle="info" key={j}>
                      {users[uid].displayName || users[uid].email}
                    </Button>
                  )}*/}
                </Panel>
              )
            : <span>Loading...</span>
          }
        </Panel>
      </Grid>
    )
  }
}


export default UserProjects