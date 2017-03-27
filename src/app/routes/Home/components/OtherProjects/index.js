import { connect } from 'react-redux'
import OtherProjects from './OtherProjects'
import {fetchProjects, fetchOtherProjects, joinToProject} from '../../../../modules/Projects'

const mapActionCreators = ({
  fetchOtherProjects,
  fetchProjects,
  joinToProject
})
const mapStateToProps = ({
  Projects: {OtherProjects, projects},
  User: {users}
}) => ({
  projects,
  OtherProjects,
  users
})

export default connect(mapStateToProps, mapActionCreators)(OtherProjects)