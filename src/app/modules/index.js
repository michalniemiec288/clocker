import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import {reducer as modal} from 'redux-modal'
import User from './User'
import Projects from './Projects'

export default combineReducers({
  form,
  modal,
  User,
  Projects
})
