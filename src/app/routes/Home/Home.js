import React, {Component} from 'react'
import Login from '../../components/user/login'
import Projects from './components/Projects/Projects'

const Home = ({loggedIn, uid, displayName, projects, newProject, openNewProjectModal, fetchProjects, fetchUsersList, users, joinToProject}) =>
  loggedIn
    ? <Projects 
        uid={uid}
        displayName={displayName}
        projects={projects}
        newProject={newProject}
        openNewProjectModal={openNewProjectModal}
        fetchProjects={fetchProjects}
        fetchUsersList={fetchUsersList}
        users={users}
        joinToProject={joinToProject}
      />
    : <Login />

export default Home
