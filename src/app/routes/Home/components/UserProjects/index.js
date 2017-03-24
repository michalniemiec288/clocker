import { connect } from 'react-redux'
import UserProjects from './UserProjects'
import {fetchProjects, fetchUserProjects, fetchOtherProjects, newProject, openNewProjectModal} from '../../../../modules/Projects'
import {fetchUsersList} from '../../../../modules/User'
import {fetchTimers, newTimer} from '../../../../modules/Timers'

const mapActionCreators = ({
  fetchProjects,
  fetchUserProjects,
  fetchUsersList,
  openNewProjectModal,
  newProject
})
const mapStateToProps = ({
  Projects: {UserProjects, projects},
  User: {users}
}) => ({
  projects,
  UserProjects,
  users
})

export default connect(mapStateToProps, mapActionCreators)(UserProjects)