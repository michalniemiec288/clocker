import { connect } from 'react-redux'
import Counter from './Counter'
import {counterTime, fetchTimers, fetchTimeline, addTimer} from '../../../../modules/Timers'

const mapActionCreators = {
  counterTime,
  addTimer
}

const mapStateToProps = ({
  User: {currentUser: {uid}}
}) => ({
  uid
})

export default connect(mapStateToProps, mapActionCreators)(Counter)