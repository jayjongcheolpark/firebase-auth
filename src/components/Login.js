import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { app, facebookProvider } from '../base'

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Login extends Component {

  state = {
    redirect: false
  }

  authWithFacebook = () => {
    app.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          console.error("Unable to sign in with Facebook")
        } else {
          this.setState({ redirect: true })
        }
      })
  }

  authWithEmailPassword = (event) => {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if(providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          this.loginForm.reset()
          console.error("Try alternative login.")
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          this.setState({redirect: true})
        }
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  render () {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <div style={loginStyles}>
        <button
          style={{width: "100%"}}
          onClick={() => { this.authWithFacebook() }}
        >
          Log In with Facebook
        </button>
        <hr style={{marginTop: "10px", marginBottom: "10px"}} />
        <form
          onSubmit={(event) => { this.authWithEmailPassword(event) }}
          ref={(form) => { this.loginForm = form }}
        >
          <div style={{marginBottom: "10px"}}>
            <h5>Note</h5>
            If you don't have an account already, this form will create your account.
          </div>
          <input style={{width: "100%"}} name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email" />
          <input style={{width: "100%"}} name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password" />
          <input style={{width: "100%"}} type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}

export default Login