import React, { Component } from 'react'
import ProfileFormContainer from '../user/ui/profileform/ProfileFormContainer'

class Profile extends Component {
  render() {
    return (
      <div className="container login">
        <div className="box">
          <h1>Profile</h1>
          <p>Edit your account details here.</p>
          <ProfileFormContainer />
        </div>
      </div>
    )
  }
}

export default Profile
