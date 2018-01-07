import React, { Component } from 'react'
import SignUpFormContainer from '../user/ui/signupform/SignUpFormContainer'

class SignUp extends Component {
  render() {
    return (
      <div className="container login">
        <div className="box">
          <img
            src="/assets/signup.png"
            alt="University Hat"
            className="welcome-icon"
          />
          <h1>Sign Up</h1>
          <p>
            We've got your wallet information, simply input your name and your
            account is made!
          </p>
          <SignUpFormContainer />
        </div>
      </div>
    )
  }
}

export default SignUp
