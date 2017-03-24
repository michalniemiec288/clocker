import Firebase from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {TIME_FORMAT} from '../utils/time'
import {show} from 'redux-modal'
import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_TIMERS = 'FETCH_TIMERS'
export const NEW_TIMER = 'NEW_TIMER'
export const STOP_TIMER = 'STOP_TIMER'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchTimers = () => ({
  type: FETCH_TIMERS,
  timers: Firebase.getRef(`timers`).once('value').then(e => e.val())
})

export const newTimer = (uid, pid) => (dispatch, getState) => {
  const start = moment().format()
  const {currentUser: {displayName}} = getState().User

  const tid = Firebase.getRef('timers').push().getKey()
  Firebase.getRef(`timers/${tid}/start`).set(start)
  Firebase.getRef(`projects/${pid}/timers/${tid}`).set(true)
  Firebase.getRef(`users/${uid}/timers/${tid}`).set(true)

  return ({
    type: NEW_TIMER,
    displayName,
    tid,
    pid,
    start
  })
}

export const stopTimer = (tid, pid) => {
  const end = moment().format()
  Firebase.getRef(`timers/${tid}/stop`).set(end)
  return ({
    type: STOP_TIMER,
    tid,
    pid,
    end
  })
}



// ------------------------------------
// Helpers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  timers: {},
  projectsTimeline: {
  // [pid]: {[tid]: { start, end, content }}
  }
}

export default createReducer(initialState, {
  [FETCH_TIMERS]: (state, {timers}) => ({timers}),
  [NEW_TIMER]: (state, {tid, pid, start, displayName}) => ({
    projectsTimeline: {[pid]: {[tid]: {start, content: displayName}}}
  }),
  [STOP_TIMER]: (state, {tid, pid, end}) => ({
    projectsTimeline: {[pid]: {[tid]: {end}}}
  })
})
