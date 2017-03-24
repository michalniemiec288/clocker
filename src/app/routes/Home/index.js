import { connect } from 'react-redux'
import Home from './Home'
import {fetchProjects, newProject, fetchUserProjects, fetchOtherProjects} from '../../modules/Projects'
import {fetchUsersList} from '../../modules/User'
import {fetchTimers} from '../../modules/Timers'

const mapActionCreators = ({
  fetchProjects,
  fetchUserProjects,
  fetchOtherProjects,
  fetchUsersList,
  newProject
})
const mapStateToProps = ({
  User: {currentUser, users},
  Projects: {projects}
}) => ({
  loggedIn: !!currentUser,
  users,
  projects
})

export default connect(mapStateToProps, mapActionCreators)(Home)