import { connect } from 'react-redux'
import OtherProjects from './OtherProjects'
import {fetchProjects, newProject, joinToProject} from '../../../../modules/Projects'
import {fetchUsersList} from '../../../../modules/User'

const mapActionCreators = ({
  fetchUsersList,
  fetchProjects,
  joinToProject
})
const mapStateToProps = ({
  User: {currentUser, users},
  Projects: {projects}
}) => ({
  uid: currentUser && currentUser.uid,
  projects,
  users
})

export default connect(mapStateToProps, mapActionCreators)(OtherProjects)