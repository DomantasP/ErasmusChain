import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Dashboard</h1>
          <p>
            <strong>Congratulations {this.props.authData.name}!</strong> If
            you're seeing this page, you've logged in with your own smart
            contract successfully.
          </p>
        </div>
      </div>
    )
  }
}

export default Dashboard
