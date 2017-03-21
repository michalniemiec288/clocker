import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, browserHistory } from 'react-router'
import ReduxPromise from 'redux-promise'
import './assets/favicon.ico';

import reducers from './modules'
import routes from './routes'

// bundling styles
import './bundle.scss'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

const provider =
  <Provider store={createStoreWithMiddleware(reducers, composeEnhancers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>

ReactDOM.render(provider, document.querySelector('.react-root'))
