import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {Router, browserHistory} from 'react-router'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import './assets/favicon.ico'

import reducers from './modules'
import routes from './routes'

// bundling styles
import './bundle.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(ReduxThunk, ReduxPromise)
))

const provider =
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>

ReactDOM.render(provider, document.querySelector('.react-root'))
