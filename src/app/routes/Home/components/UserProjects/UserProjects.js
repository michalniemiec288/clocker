import React, {Component} from 'react'
import {Grid, Panel, Button, Well, Image} from 'react-bootstrap'
import UsersList from '../../../../components/user/UsersList'
import TimersContainer from '../Timers/index'
import CounterContainer from '../Counter/index'
import {isNotEmpty} from '../../../../utils/object'

const header = openNewProjectModal =>
  <div> Your Projects
    <Button
      style={{marginLeft: 20}}
      onClick={openNewProjectModal}>
      Add
    </Button>
  </div>
const subHeader = (name, pid) =>
  <span>
    {name}
    <CounterContainer pid={pid}/>
  </span>

class UserProjects extends Component {
  componentWillMount() {
    this.props.fetchProjects()
    this.props.fetchTimers()
  }
  componentWillReceiveProps(next) {
    const {projects, fetchUserProjects, timers, fetchTimers, timelines, fetchTimeline} = this.props
    projects !== next.projects && fetchUserProjects(next.projects)
    timers !== next.timers && fetchTimers()
  }
  render() {
    const {UserProjects, users, timelines, openNewProjectModal} = this.props
    return (
      <Grid className='content'>
        <Panel header={header(openNewProjectModal)} bsStyle="primary">
          {UserProjects && UserProjects.map((project, i) =>
            <Panel
              key={i}
              header={subHeader(project.name, project.pid)}
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