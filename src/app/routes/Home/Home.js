import React, {Component} from 'react'
import {Grid, Button} from 'react-bootstrap'
import Login from '../../components/user/login'
import UserProjectsContainer from './components/UserProjects/index'
import OtherProjectsContainer from './components/OtherProjects/index'
import NewProjectModal from './components/modals/NewProjectModal'
import {isNotEmpty} from '../../utils/object'

class Home extends Component {
  componentWillReceiveProps(next) {
    const {currentUser, fetchUsersList} = this.props
    currentUser !== next.currentUser && fetchUsersList()
  }
  render() {
    const {currentUser, users, newProject} = this.props
    return (
      (isNotEmpty(currentUser) && isNotEmpty(users))
        ? <div>
            <UserProjectsContainer />
            <OtherProjectsContainer />
            <NewProjectModal onSubmit={newProject} />
          </div>
        : <Login />
    )
  }
}

export default Home
