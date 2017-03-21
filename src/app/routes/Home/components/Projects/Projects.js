import React, {Component} from 'react'
import {Grid, Panel, Button, ButtonGroup, Well} from 'react-bootstrap'
import NewProjectModal from '../modals/NewProjectModal'

class Projects extends Component {
  componentWillMount() {
    this.props.fetchProjects()
    this.props.fetchUsersList()
  }
  render() {
    const {uid, projects, newProject, openNewProjectModal, users, joinToProject, fetchProjects} = this.props
    return (   
      <Grid className='content'>
        <Panel header={
          <div>
            Projekty
            <Button
              style={{marginLeft: 20}}
              onClick={openNewProjectModal}>
              Dodaj
            </Button>
          </div>
        }
        bsStyle="primary">
        {projects 
          ? Object.keys(projects).map(pid =>
              <Panel
                header={
                <span>
                  {projects[pid].name}
                  {!Object.keys(projects[pid].members).includes(uid) &&
                    <Button
                        style={{marginLeft: 20}}
                        onClick={() => {joinToProject({pid, uid}); fetchProjects()}}>
                        Dołącz
                    </Button>
                  }
                </span>
                }
                bsStyle="info">
                Opis: <Well bsStyle='sm'>{projects[pid].description}</Well>
                Członkowie:
                {Object.keys(projects[pid].members).map(uid => 
                  <Button style={{marginLeft: 10}} bsStyle="info">
                    {
                        users[projects[pid].members[uid]].displayName || 
                        users[projects[pid].members[uid]].email
                    }
                  </Button>
                )}
              </Panel>
            )
          : <span>ładowanie</span>
        }
        </Panel>
        <NewProjectModal
          initialValues={{members: {[uid]: uid}}}
          onSubmit={newProject}
          onSubmitSuccess={fetchProjects}
        />
      </Grid>
    )
  }
}
export default Projects