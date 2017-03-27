import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, logoutUser } from '../../modules/User'
import Header from './Header'
import './Header.scss'

const mapActionCreators = {
    fetchUser,
    logoutUser
}
const mapStateToProps = ({
    User: {currentUser}
}) => ({
    currentUser
})

export default connect(mapStateToProps, mapActionCreators)(Header)
