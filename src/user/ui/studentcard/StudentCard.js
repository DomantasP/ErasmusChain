import React, { Component } from 'react'

class StudentCard extends Component {
  render() {
    return (
      <div className="student-card">
        <div className="student-card-section">
          <strong>ID: </strong>
          {this.props.student.id}
        </div>
        <div className="student-card-section">
          <strong>First name: </strong> {this.props.student.firstName}
        </div>
        <div className="student-card-section">
          <strong>Last name: </strong> {this.props.student.lastName}
        </div>
        <button className="nav-button">Add Course</button>
        <button className="nav-button">Add Erasmus University</button>
      </div>
    )
  }
}

export default StudentCard
