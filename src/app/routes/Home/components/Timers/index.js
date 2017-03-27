import { connect } from 'react-redux'
import Timers from './Timers'
import {newTimer, stopTimer, fetchTimers, fetchTimeline} from '../../../../modules/Timers'
import moment from 'moment'

const mapActionCreators = ({
  fetchTimers,
  fetchTimeline,
  newTimer,
  stopTimer
})

const mapStateToProps = ({
  Timers: {timers, timelines}
}) => ({
  timers,
  timelines
})

export default connect(mapStateToProps, mapActionCreators)(Timers)