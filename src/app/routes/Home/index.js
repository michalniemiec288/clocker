import { connect } from 'react-redux'
import Home from './Home'
import {fetchProjects, newProject, openNewProjectModal, joinToProject} from '../../modules/Projects'
import {fetchUsersList} from '../../modules/User'

const mapActionCreators = ({
  fetchProjects,
  newProject,
  openNewProjectModal,
  fetchUsersList,
  joinToProject
})
const mapStateToProps = ({
  User: {currentUser, users},
  Projects: {projects}
}) => ({
  loggedIn: !!currentUser,
  uid: currentUser && currentUser.uid,
  displayName: currentUser && currentUser.displayName,
  projects,
  users
})

export default connect(mapStateToProps, mapActionCreators)(Home)