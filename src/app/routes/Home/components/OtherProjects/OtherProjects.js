import React, {Component} from 'react'
import {Grid, Panel, Button, ButtonGroup, Well} from 'react-bootstrap'

const header = ({projects, pid, uid, joinToProject, fetchProjects}) =>
  <div>
    {projects[pid].name}
    <Button
      style={{marginLeft: 20}}
      onClick={() => { joinToProject(pid, uid); fetchProjects(); }}>
      Join
    </Button>
  </div>

const UserProjects = ({uid, projects, users, joinToProject, fetchProjects}) =>
  <Grid className='content'>
    <Panel header='Other Projects' bsStyle="info">
      {projects
        ? Object.keys(projects).map((pid, i) =>
            !projects[pid].users[uid] &&
              <Panel key={i} header={header({projects, pid, uid, joinToProject, fetchProjects})}>
                <Well bsStyle='sm'>{projects[pid].description}</Well>
                {users && Object.keys(projects[pid].users).map((mid, j) =>
                  <Button key={j} style={{marginLeft: 10}} bsStyle="info">
                    {users[mid].displayName || users[mid].email}
                  </Button>
                )}
              </Panel>
          )
        : <span>Loading...</span>
      }
    </Panel>
  </Grid>

export default UserProjects