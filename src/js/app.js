import React, { Component } from 'react'
import { render } from 'react-dom'

import '../css/main.css'

class App extends Component {
  render () {
    return <h1>Montsegur</h1>
  }
}

render(<App />, document.getElementById('App-root'))
