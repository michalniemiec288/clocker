import { connect } from 'react-redux'
import Home from './Home'
import {fetchProjects, newProject, openNewProjectModal} from '../../modules/Projects'
import {fetchUsersList} from '../../modules/User'

const mapActionCreators = ({
  fetchProjects,
  fetchUsersList,
  newProject,
  openNewProjectModal
})
const mapStateToProps = ({
  User: {currentUser, users},
  Projects: {projects}
}) => ({
  currentUser,
  users,
  projects
})

export default connect(mapStateToProps, mapActionCreators)(Home)