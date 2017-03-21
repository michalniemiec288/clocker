import React from 'react'
import Header from '../../components/Header'

const App = ({children}) =>
  <div className="app">
    <section className="page">
      <Header />
      <div className="content">
        {children}
      </div>
    </section>
  </div>

export default App
