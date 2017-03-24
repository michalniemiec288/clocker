import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import {reducer as modal} from 'redux-modal'
import User from './User'
import Projects from './Projects'
import Timers from './Timers'
import Statistics from './Statistics'

export default combineReducers({
  form,
  modal,
  User,
  Projects,
  Timers,
  Statistics
})
