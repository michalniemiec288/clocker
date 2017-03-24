import { connect } from 'react-redux'
import Timers from './Timers'
import {newTimer, stopTimer, fetchTimers} from '../../../../modules/Timers'
import moment from 'moment'

const mapActionCreators = ({
  fetchTimers,
  newTimer,
  stopTimer
})

const mapStateToProps = ({
  User: {currentUser, users},
  Timers: {timers, activeTid}
}) => ({
  uid: currentUser && currentUser.uid,
  displayName: currentUser && currentUser.displayName,
  timers,
  activeTid,
  activeTimer: timers && timers[activeTid] || null
})

export default connect(mapStateToProps, mapActionCreators)(Timers)