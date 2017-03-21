import FireBaseTools from '../utils/firebase'
import createReducer from '../utils/createReducer'
import {show} from 'redux-modal'

// ------------------------------------
// Constants
// ------------------------------------

const FETCH_PROJECTS = 'FETCH_PROJECTS'
const NEW_PROJECT = 'NEW_PROJECT'
const JOIN_TO_PROJECT = 'JOIN_TO_PROJECT'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: FireBaseTools.getDatabaseReference('projects').once('value').then(e => e.val())
})

export const newProject = form => ({
  type: NEW_PROJECT,
  payload: FireBaseTools.getDatabaseReference('projects').push().set(form)
})

export const joinToProject = ({pid, uid}) => ({
  type: JOIN_TO_PROJECT,
  payload: FireBaseTools.getDatabaseReference(`projects/${pid}/members/${uid}`).set(uid)
})

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
