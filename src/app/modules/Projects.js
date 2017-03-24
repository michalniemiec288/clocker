import Firebase from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {show} from 'redux-modal'

// ------------------------------------
// Constants
// ------------------------------------

const FETCH_PROJECTS = 'FETCH_PROJECTS'
const NEW_PROJECT = 'NEW_PROJECT'
const JOIN_TO_PROJECT = 'JOIN_TO_PROJECT'
const USER_PROJECTS = 'USER_PROJECTS'
const OTHER_PROJECTS = 'OTHER_PROJECTS'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: Firebase.getRef('projects').once('value').then(e => e.val())
})

export const fetchUserProjects = () => (dispatch, getState) => {
  const {User: {currentUser: {uid}}, Projects: {projects}} = getState()
  const UserProjects = []

  Object.keys(projects).map(pid =>
    checkProject(projects[pid], uid) && UserProjects.push(projects[pid]))
  dispatch ({
    type: USER_PROJECTS,
    UserProjects
  })
}

export const fetchOtherProjects = () => (dispatch, getState) => {
  const {User: {currentUser: {uid}}, Projects: {projects}} = getState()
  const OtherProjects = []

  Object.keys(projects).map(pid =>
    projects[pid] && !Object.keys(projects[pid].users).includes(uid) &&
    OtherProjects.push(projects[pid])
  )
  return ({
    type: OTHER_PROJECTS,
    OtherProjects
  })
}

export const newProject = form => (dispatch, getState) => {
  const {currentUser: {uid}} = getState().User
  const pid = Firebase.getRef('projects').push().getKey()

  Firebase.getRef(`projects/${pid}`).set(form)
  Firebase.getRef(`projects/${pid}/users/${uid}`).set(true)
  Firebase.getRef(`users/${uid}/projects/${pid}`).set(true)
  return ({
    type: NEW_PROJECT,
  })
}

export const joinToProject = pid => {
  const {currentUser: {uid}} = getState().User

  Firebase.getRef(`projects/${pid}/users/${uid}`).set(true)
  Firebase.getRef(`users/${uid}/projects/${pid}`).set(true)
  return ({
    type: JOIN_TO_PROJECT,
  })
}

// ------------------------------------
// Helpers
// ------------------------------------

export const openNewProjectModal = () => show('newProjectModal')

const checkProject = (project, uid) =>
  typeof project === 'object' &&
  typeof project.users === 'object' &&
  Object.keys(project.users).includes([uid]) &&
  Object(project).hasOwnProperty(name) &&
  Object(project).hasOwnProperty(description)

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  projects: {},
  UserProjects: [],
  OtherProjects: [],
}

export default createReducer(initialState, {
  [FETCH_PROJECTS]: (state, {payload}) => ({projects: payload}),
  [USER_PROJECTS]: (state, {UserProjects}) => ({UserProjects}),
  [OTHER_PROJECTS]: (state, {OtherProjects}) => ({OtherProjects})
})
