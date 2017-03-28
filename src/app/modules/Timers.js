import Firebase from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {show} from 'redux-modal'
import moment from 'moment'
import {isNotEmpty} from '../utils/object'

// ------------------------------------
// Constants
// ------------------------------------

export const COUNT_TIME = 'COUNT_TIME'
export const FETCH_TIMERS = 'FETCH_TIMERS'
export const REDUCE_TIMELINE = 'REDUCE_TIMELINE'
export const ADD_TIMER_TO_PROJECT_TIMELINE = 'ADD_TIMER_TO_PROJECT_TIMELINE'
export const ADD_TIMER = 'ADD_TIMER'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchTimers = () => ({
  type: FETCH_TIMERS,
  payload: Firebase.getRef(`timers`).once('value').then(e => e.val())
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


export const addTimer = ({uid, pid, start, end}) => (dispatch, getState) => {
  const {currentUser: {displayName}} = getState().User
  const tid = Firebase.getRef('timers').push().getKey()
  const start = moment().format()
  
  Firebase.getRef(`timers/${tid}`).set({uid, pid, start, end})
  Firebase.getRef(`projects/${pid}/timers/${tid}`).set(true)
  Firebase.getRef(`users/${uid}/timers/${tid}`).set(true)

  dispatch({
    type: ADD_TIMER,
    timer: {tid, uid, pid, start, end}
  })
  dispatch({
    type: ADD_TIMER_TO_PROJECT_TIMELINE,
    pid,
    timer: {
      id: tid,
      start,
      end,
      content: displayName
    }
  })
}



// ------------------------------------
// Helpers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  timers: {}, // [tid]: {uid, pid, start, end}
  timelines: {},  // [pid]: [...timelines[pid], { id, start, end, content }]
}

export default createReducer(initialState, {
  [COUNT_TIME]: () => ({now: moment().format()}),
  [FETCH_TIMERS]: (state, {payload}) => ({timers: payload}),
  [REDUCE_TIMELINE]: () => ({timelines: initialState.timelines}),
  [ADD_TIMER_TO_PROJECT_TIMELINE]: ({timelines}, {pid, timer: {id, start, end, content}}) => ({
    timelines: isNotEmpty(timelines)
      ? {...timelines, [pid]: [...timelines[pid], {id, start, end, content}]}
      : {[pid]: [{id, start, end, content}]}
  }),
  [ADD_TIMER]: ({timers}, {timer: {tid, uid, pid, start, end}}) => ({
    timers: {...timers, [tid]: {uid, pid, start, end}}
  })
})
