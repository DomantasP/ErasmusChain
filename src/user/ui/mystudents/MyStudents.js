import React, { Component } from 'react'

import StudentCardContainer from '../studentcard/StudentCardContainer'

class MyStudents extends Component {
  componentDidMount() {
    this.props.fetchStudents(this.props.route.type)
  }

  renderStudents() {
    return this.props.students.map(student => (
      <StudentCardContainer key={student.id} student={student} />
    ))
  }

  render() {
    return (
      <div className="container list-container">
        <div className="student-list">{this.renderStudents()}</div>
      </div>
    )
  }
}

export default MyStudents
