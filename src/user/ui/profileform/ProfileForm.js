import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2) {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={this.onInputChange.bind(this)}
          placeholder="Name"
        />
        <button type="submit" className="nav-button">
          Update
        </button>
      </form>
    )
  }
}

export default ProfileForm
