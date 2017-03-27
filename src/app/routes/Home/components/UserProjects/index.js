import { connect } from 'react-redux'
import UserProjects from './UserProjects'
import {fetchProjects, fetchUserProjects, openNewProjectModal} from '../../../../modules/Projects'

const mapActionCreators = ({
  fetchProjects,
  fetchUserProjects,
  openNewProjectModal
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