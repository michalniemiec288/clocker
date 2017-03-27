import React, {Component} from 'react'
import {Grid, Panel, Button, Well} from 'react-bootstrap'
import UsersList from '../../../../components/user/UsersList'
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
  componentWillMount() {
    this.props.fetchProjects()
  }
  componentWillReceiveProps(next) {
    const {projects, fetchUserProjects} = this.props
    projects !== next.projects && fetchUserProjects(next.projects)
  }
  render() {
    const {UserProjects, users, openNewProjectModal} = this.props
    return (
      <Grid className='content'>
        <Panel header={header(openNewProjectModal)} bsStyle="primary">
          {UserProjects && UserProjects.map((project, i) =>
            <Panel
              key={i}
              header={project.name}
              bsStyle="info" >
              <Well bsStyle='sm'>{project.description}</Well>
              <TimersContainer project={project} />
              <UsersList users={users} uids={Object.keys(project.users)} />
            </Panel>
          )}
        </Panel>
      </Grid>
    )
  }
}


export default UserProjects