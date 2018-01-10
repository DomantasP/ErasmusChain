import React, { Component } from 'react'

import StudentCardContainer from '../studentcard/StudentCardContainer'

class MyStudents extends Component {
  componentWillMount() {
    this.props.fetchStudents(this.props.route.type)
  }

  renderStudents() {
    if (this.props.students.length > 0)
      return this.props.students.map(student => (
        <StudentCardContainer
          type={this.props.route.type}
          key={student.id}
          student={student}
        />
      ))
    else return <h3> Sorry, you don't have any students in this list</h3>
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
