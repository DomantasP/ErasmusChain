import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
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

    this.props.onSignUpFormSubmit(this.state.name)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          {' '}
          You're going to do a couple of transactions, on for signing up and
          another one for creating university in our system.
        </p>
        <label htmlFor="name">University title: </label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={this.onInputChange.bind(this)}
          placeholder="Title or name"
        />
        <button type="submit" className="nav-button">
          Sign Up
        </button>
      </form>
    )
  }
}

export default SignUpForm
