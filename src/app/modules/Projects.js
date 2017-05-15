import Firebase from '../utils/firebase'
import createReducer from '../utils/createReducer'
import createRelation from '../utils/createRelation'
import {show} from 'redux-modal'
import {isNotEmpty} from '../utils/object'

// ------------------------------------
// Constants
// ------------------------------------

const FETCH_PROJECTS = 'FETCH_PROJECTS'
const NEW_PROJECT = 'NEW_PROJECT'
const JOIN_TO_PROJECT = 'JOIN_TO_PROJECT'
const REDUCE_USERS_PROJECTS = 'REDUCE_USERS_PROJECTS'
const USER_PROJECTS = 'USER_PROJECTS'
const REDUCE_OTHERS_PROJECTS = 'REDUCE_OTHERS_PROJECTS'
const OTHER_PROJECTS = 'OTHER_PROJECTS'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: Firebase.getRef('projects').once('value').then(e => e.val())
})

export const fetchUserProjects = projects => (dispatch, getState) => {
  const {currentUser: {uid}} = getState().User
  
  dispatch({type: REDUCE_USERS_PROJECTS})
  isNotEmpty(projects) &&
  Object.keys(projects).map(pid =>
    projects[pid] &&
    Object.keys(projects[pid].users).includes(uid) &&
    dispatch ({
      type: USER_PROJECTS,
      project: {pid, ...projects[pid]}
    })
  )
}

export const fetchOtherProjects = projects => (dispatch, getState) => {
  const {currentUser: {uid}} = getState().User

  dispatch({type: REDUCE_OTHERS_PROJECTS})
  isNotEmpty(projects) &&
  Object.keys(projects).map(pid =>
    projects[pid] &&
    !Object.keys(projects[pid].users).includes(uid) &&
    dispatch ({
      type: OTHER_PROJECTS,
      project: {pid, ...projects[pid]}
    })
  )
}

export const newProject = form => (dispatch, getState) => {
  const {currentUser: {uid}} = getState().User
  const pid = Firebase.getRef('projects').push().getKey()

  Firebase.getRef(`projects/${pid}`).set(form)
  createRelation([
    `projects/${pid}/users/${uid}`,
    `users/${uid}/projects/${pid}`
  ])

  dispatch({type: NEW_PROJECT})
  dispatch(fetchProjects())
}

export const joinToProject = pid => (dispatch, getState) => {
  const {currentUser: {uid}} = getState().User
  
  createRelation([
    `projects/${pid}/users/${uid}`,
    `users/${uid}/projects/${pid}`
  ])

  dispatch({type: JOIN_TO_PROJECT})
  dispatch(fetchProjects())
}

// ------------------------------------
// Helpers
// ------------------------------------

export const openNewProjectModal = () => show('newProjectModal')

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  projects: {},
  UserProjects: [],
  OtherProjects: [],
}

export default createReducer(initialState, {
  [FETCH_PROJECTS]: (state, {payload}) => ({
    projects: payload,
  }),
  [REDUCE_USERS_PROJECTS]: () => ({
    UserProjects: initialState.UserProjects
  }),
  [USER_PROJECTS]: ({UserProjects}, {project}) => ({
    UserProjects: [...UserProjects, project]
  }),
  [REDUCE_OTHERS_PROJECTS]: () => ({
    OtherProjects: initialState.OtherProjects
  }),
  [OTHER_PROJECTS]: ({OtherProjects}, {project}) => ({
    OtherProjects: [...OtherProjects, project]
  }),
})
