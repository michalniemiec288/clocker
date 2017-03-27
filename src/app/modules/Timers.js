import Firebase from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {show} from 'redux-modal'
import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_TIMERS = 'FETCH_TIMERS'
export const REDUCE_TIMELINE = 'REDUCE_TIMELINE'
export const ADD_TIMER_TO_PROJECT_TIMELINE = 'ADD_TIMER_TO_PROJECT_TIMELINE'
export const NEW_TIMER = 'NEW_TIMER'
export const STOP_TIMER = 'STOP_TIMER'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchTimers = () => ({
  type: FETCH_TIMERS,
  timers: Firebase.getRef(`timers`).once('value').then(e => e.val())
})

export const fetchTimeline = project => (dispatch, getState) => {
  const {Timers: {timers}, User: {currentUser: {displayName}}} = getState()

  dispatch({type: REDUCE_TIMELINE})
  Object(project).hasOwnProperty('timers') && timers && project.timers.map(tid =>
    timers[tid] && Object(timers[tid]).hasOwnProperty('end') &&
      dispatch({
        type: ADD_TIMER_TO_PROJECT_TIMELINE,
        pid: project.pid,
        timer: {
          id: tid,
          start: moment(timers[tid].start),
          end: moment(timers[tid].end),
          content: displayName
        }
      })
  )
}

export const newTimer = (uid, pid) => (dispatch, getState) => {
  const {currentUser: {displayName}} = getState().User
  const start = moment().format()
  const tid = Firebase.getRef('timers').push().getKey()

  Firebase.getRef(`timers/${tid}/start`).set(start)
  Firebase.getRef(`projects/${pid}/timers/${tid}`).set(true)
  Firebase.getRef(`users/${uid}/timers/${tid}`).set(true)

  dispatch({
    type: NEW_TIMER,
    tid,
    pid,
    start
  })
  dispatch({
    type: ADD_TIMER_TO_PROJECT_TIMELINE,
    pid,
    timer: {
      id: tid,
      start,
      content: displayName
    }
  })
}

export const stopTimer = tid => dispatch => {
  const end = moment().format()

  Firebase.getRef(`timers/${tid}/end`).set(end)
  dispatch({
    type: STOP_TIMER,
    tid,
    end
  })
  dispatch(fetchTimeline())
}

// ------------------------------------
// Helpers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  timers: {}, // [tid]: {uid, pid, start, end}
  timelines: {}  // [pid]: [...timelines[pid], { id, start, end, content }]
}

export default createReducer(initialState, {
  [FETCH_TIMERS]: (state, {timers}) => ({timers}),
  [REDUCE_TIMELINE]: () => ({timeline: initialState.timeline}),
  [ADD_TIMER_TO_PROJECT_TIMELINE]: ({timelines}, {pid, timer}) => ({
    timelines: {...timelines, [pid]: [...timelines[pid], timer]}
  }),
  [NEW_TIMER]: (state, {tid, uid, pid, start}) => ({
    timers: {[tid]: {uid, pid, start}}
  }),
  [STOP_TIMER]: (state, {tid, end}) => ({
    timers: {[tid]: {end}}
  })
})
