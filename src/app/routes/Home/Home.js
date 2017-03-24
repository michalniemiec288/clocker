import React, {Component} from 'react'
import Login from '../../components/user/login'
import UserProjectsContainer from './components/UserProjects/'
import OtherProjectsContainer from './components/OtherProjects/'
import NewProjectModal from './components/modals/NewProjectModal'

class Home extends Component {
  componentWillMount() {
    this.props.fetchUsersList()
    this.props.fetchProjects()
  }
  render() {
    const {loggedIn, users, projects, newProject, fetchProjects} = this.props
    return (
      loggedIn && users
        ? <div>
            <UserProjectsContainer />
            {/*<OtherProjectsContainer />*/}
            <NewProjectModal
              onSubmit={newProject}
              onSubmitSuccess={fetchProjects}
            />
          </div>
        : <Login />
    )
  }
}

export default Home
