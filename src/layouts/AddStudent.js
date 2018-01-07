import React, { Component } from 'react'
import AddStudentFormContainer from '../user/ui/addstudentform/AddStudentFormContainer'

class AddStudent extends Component {
  render() {
    return (
      <div className="container login">
        <div className="box">
          <img
            src="/assets/student.svg"
            alt="Student"
            className="welcome-icon"
          />
          <h1>Add student</h1>
          <p>
            Enter the student information and press 'Add'. The studnet will be
            added to your students list.
          </p>
          <AddStudentFormContainer />
        </div>
      </div>
    )
  }
}

export default AddStudent
