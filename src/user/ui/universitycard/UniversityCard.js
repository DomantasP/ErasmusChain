import React, { Component } from 'react'

class UniversityCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      universityAddress: ''
    }
  }

  onChange = e =>
    this.setState({
      universityAddress: e.target.value
    })

  addUniversity = () =>
    this.props.addUniversity(
      this.props.studentsID,
      this.state.universityAddress
    )

  render() {
    return (
      <div className="university-add">
        <label>University address: </label>
        <input value={this.state.universityAddress} onChange={this.onChange} />
        <button className="nav-button" onClick={this.addUniversity}>
          Add
        </button>
      </div>
    )
  }
}

export default UniversityCard
