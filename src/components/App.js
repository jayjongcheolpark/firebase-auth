import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { app } from '../base'
import Header from './Header'
import Login from './Login'
import Logout from './Logout'


class App extends Component {

  state = {
    authenticated: false,
    loading: true
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }

  render () {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
        </div>
      )
    }

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header authenticated={this.state.authenticated} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App