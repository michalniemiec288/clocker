import Firebase from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {show} from 'redux-modal'
import moment from 'moment'
import {isNotEmpty} from '../utils/object'

// ------------------------------------
// Constants
// ------------------------------------

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
  const {Timers: {timers}, User: {currentUser: {displayName, uid}}} = getState()

  Object(project).hasOwnProperty('timers') && Object.keys(project.timers).map((tid, i) =>
    timers[tid] && dispatch({
      type: ADD_TIMER_TO_PROJECT_TIMELINE,
      pid: project.pid,
      timer: {
        id: i,
        group: 1,
        start_time: moment(timers[tid].start),
        end_time: moment(timers[tid].end),
        title: displayName
      }
    })
  )
}

export const startTimer = ({uid, pid, start}) => (dispatch, getState) => {
  const tid = Firebase.getRef('timers').push().getKey()
  dispatch({
    type: START_TIMER,
    timer: {
      tid,
      uid,
      pid,
      start: moment(start)
    }
  })
}

export const addTimer = ({uid, pid, start, end}) => (dispatch, getState) => {
  const {currentUser: {displayName}} = getState().User

  
  Firebase.getRef(`timers/${tid}`).set({uid, pid, start, end})
  Firebase.getRef(`projects/${pid}/timers/${tid}`).set(true)
  Firebase.getRef(`users/${uid}/timers/${tid}`).set(true)

  dispatch({
    type: ADD_TIMER_TO_PROJECT_TIMELINE,
    pid,
    timer: {
      group: 1,
      start_time: moment(start),
      end_time: moment(end),
      title: displayName
    }
  })
  dispatch({
    type: ADD_TIMER,
    timer: {
      tid,
      uid,
      pid,
      start: moment(start),
      end: moment(end)
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
  timers: null, // [tid]: {uid, pid, start, end}
  timelines: {},  // [pid]: [...timelines[pid], { id, group: uid, start_time, end_time, title }]
}

export default createReducer(initialState, {
  [FETCH_TIMERS]: (state, {payload}) => ({timers: payload}),
  [REDUCE_TIMELINE]: () => ({timelines: initialState.timelines}),
  [ADD_TIMER_TO_PROJECT_TIMELINE]: ({timelines}, {pid, timer: {id, group, start_time, end_time, title}}) => ({
    timelines: isNotEmpty(timelines)
    ? {
        ...timelines,
        [pid]: [
          ...timelines[pid],
          {
            id: (timelines[pid][timelines[pid].length-1].id)+1,
            group,
            start_time,
            end_time,
            title
          }
        ]
      }
    : {[pid]: [{id: 0, group, start_time, end_time, title}]}
  }),
  [ADD_TIMER]: ({timers}, {timer: {tid, uid, pid, start, end}}) => ({
    timers: {...timers, [tid]: {uid, pid, start, end}}
  })
})
