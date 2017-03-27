import React, {Component} from 'react'
import {Grid, Panel, Well, Button} from 'react-bootstrap'
import UsersList from '../../../../components/user/UsersList'

const header = (name, pid, joinToProject) =>
  <div>
    {name}
    <Button
      style={{marginLeft: 20}}
      onClick={() => joinToProject(pid)}>
      Join
    </Button>
  </div>

class OtherProjects extends Component {
  componentWillMount() {
    this.props.fetchProjects()
  }
  componentWillReceiveProps(next) {
    const {projects, fetchOtherProjects} = this.props
    projects !== next.projects && fetchOtherProjects(next.projects)
  }
  render() { 
    const {OtherProjects, users, projects, joinToProject} = this.props
    return (
      <Grid className='content'>
        <Panel header='Other Projects' bsStyle="info">
          {OtherProjects && OtherProjects.map((project, i) =>
            <Panel
              key={i}
              header={header(project.name, project.pid, joinToProject)} >
              <Well bsStyle='sm'>{project.description}</Well>
              <UsersList users={users} uids={Object.keys(project.users)} />
            </Panel>
          )}
        </Panel>
      </Grid>
    )
  }
}

export default OtherProjects