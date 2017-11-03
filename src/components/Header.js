import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    return (
      <div>
        {this.props.authenticated ? <Link to="/logout">Logout</Link>
          : <Link to="/login">Register / Login</Link>
        }
      </div>
    )
  }
}

export default Header