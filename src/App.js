import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './sass/styles.sass'

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() => (
      <span>
        <li>
          <Link to="/dashboard" className="nav-button">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/addStudent" className="nav-button">
            Add Student
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-button">
            Profile
          </Link>
        </li>
        <LogoutButtonContainer />
      </span>
    ))

    const OnlyGuestLinks = HiddenOnlyAuth(() => (
      <span>
        <img src="/assets/welcome.png" alt="Welcome" className="welcome-icon" />
        <p className="welcome-text">
          No need to create an account, use your wallet to sign up or login!
        </p>
        <li>
          <Link to="/signup" className="nav-button">
            Sign Up
          </Link>
        </li>
        <LoginButtonContainer />
      </span>
    ))

    return (
      <div className="App">
        <nav>
          <ul>
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default App
