import React, { Component } from 'react'

class AddStudentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      id: ''
    }
  }

  onInputFirstNameChange(event) {
    this.setState({ firstName: event.target.value })
  }

  onInputLastNameChange(event) {
    this.setState({ lastName: event.target.value })
  }

  onInputIDChange(event) {
    this.setState({ id: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.firstName.length < 2) {
      return alert('Please fill in your first name.')
    }

    if (this.state.lastName.length < 2) {
      return alert('Please fill in your last name.')
    }

    if (this.state.id.length < 2) {
      return alert('Id must be longer than 2 symbols.')
    }

    this.props.onAddStudentFormSubmit(
      this.state.firstName,
      this.state.lastName,
      this.state.id
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="name">First Name: </label>
        <input
          id="firstName"
          type="text"
          value={this.state.firstName}
          onChange={this.onInputFirstNameChange.bind(this)}
          placeholder="First Name"
        />
        <label htmlFor="name">Last Name: </label>
        <input
          id="lastName"
          type="text"
          value={this.state.name}
          onChange={this.onInputLastNameChange.bind(this)}
          placeholder="Last name"
        />
        <label htmlFor="name">Student's ID: </label>
        <input
          id="id"
          type="text"
          value={this.state.id}
          onChange={this.onInputIDChange.bind(this)}
          placeholder="Student's ID"
        />
        <button type="submit" className="nav-button">
          Add
        </button>
      </form>
    )
  }
}

export default AddStudentForm
