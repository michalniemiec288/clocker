import { connect } from 'react-redux'
import UserProjects from './UserProjects'
import {fetchProjects, fetchUserProjects, openNewProjectModal} from '../../../../modules/Projects'
import {fetchTimers, fetchTimeline} from '../../../../modules/Timers'

const mapActionCreators = ({
  fetchProjects,
  fetchUserProjects,
  fetchTimers,
  fetchTimeline,
  openNewProjectModal
})
const mapStateToProps = ({
  Projects: {UserProjects, projects},
  Timers: {timelines, timers},
  User: {users}
}) => ({
  projects,
  UserProjects,
  users
})

export default connect(mapStateToProps, mapActionCreators)(UserProjects)