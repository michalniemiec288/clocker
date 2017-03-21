import FireBaseTools from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {show} from 'redux-modal'
import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_USER_TIMERS = 'FETCH_USER_TIMERS'
export const NEW_TIMER = 'NEW_TIMER'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchUserTimers = uid => ({
  type: FETCH_USER_TIMERS,
  payload: FireBaseTools.getDatabaseReference(`timers/${uid}`).once('value').then(e => e.val())
})

export const newTimer = ({uid, pid}) => {
  const start = moment()
  return ({
    type: NEW_TIMER,
    payload: FireBaseTools.getDatabaseReference('timers').push().set({uid, pid, start})
  })
}

// ------------------------------------
// Helpers
// ------------------------------------

export const openNewProjectModal = () => show('newProjectModal')

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  projects: null
}

export default createReducer(initialState, {
  [FETCH_PROJECTS]: (state, {payload}) => ({projects: payload}),
  [NEW_PROJECT]: (state, {payload}) => ({projects: payload})
})
