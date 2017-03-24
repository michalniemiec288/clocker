import Firebase from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {show} from 'redux-modal'
import moment from 'moment'
import {fetchTimers} from './Timers'

// ------------------------------------
// Constants
// ------------------------------------

export const USER_IN_PROJECT = 'USER_IN_PROJECT'
export const TOTAL_IN_PROJECT = 'TOTAL_IN_PROJECT'

// ------------------------------------
// Actions
// ------------------------------------

export const totalProjectTime = (projectTids, pid) => (dispatch, getState) => {
  const {timers} = getState().Timers

  let total = 0, daily = 0
  timers && Object.keys(projectTids).map((tid, i) => {
    if (checkTimer(timers[tid])) {
      total += durationHelper(timers[tid].start, timers[tid].stop)
      if (moment().format().isSame(moment(timers[tid].start), 'day'))
        daily += durationHelper(timers[tid].start, timers[tid].stop)
    }
  })

  dispatch({
    type: TOTAL_IN_PROJECT,
    total: durationToUtc(total),
    daily: durationToUtc(daily),
    pid
  })
}

export const userProjectTime = (projectTids, userTids, pid) => (dispatch, getState) => {
  const {timers} = getState().Timers
  const UserProjectTime = []

  timers && Object.keys(projectTids).map((tid, i) => {
    if (userTids[tid] && checkTimer(timers[tid]))
      UserProjectTime.push({start: timers[tid].start, end: timers[tid].stop})
  })

  let total = 0, daily = 0
  UserProjectTime.map(({start, end}) => {
    total += durationHelper(start, end)
    if (moment().format().isSame(moment(start), 'day')) daily += durationHelper(start, end)
  })

  const durations = []
  UserProjectTime.map(({start, end}) => {
    durations.push(durationToUtc(durationHelper(start, end)))
  })

  dispatch({
    type: USER_IN_PROJECT,
    timers: durations,
    total: durationToUtc(total),
    daily: durationToUtc(daily),
    pid
  })
}

// ------------------------------------
// Helpers
// ------------------------------------

const durationHelper = (start, stop) => moment(stop).diff(moment(start), 'milliseconds', true)
const durationToUtc = duration => moment.utc(duration).format('HH:mm:ss')
const checkTimer = timer => !!(typeof (timer) === 'object' && Object(timer).hasOwnProperty('stop') && Object(timer).hasOwnProperty('start'))

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  totalTimeInProjects: {},  // {[pid]: total}
  userTimeInProjects: {}    // [pid]: {total, daily, timers: [utc]}
}

export default createReducer(initialState, {
  [USER_IN_PROJECT]: (state, {timers, total, daily, pid}) => ({
    userTimeInProjects: { [pid]: {timers, total, daily} }
  }),
  [TOTAL_IN_PROJECT]: (state, {total, daily, pid}) => ({
    totalTimeInProjects: { [pid]: {total, daily} }
  })
})
