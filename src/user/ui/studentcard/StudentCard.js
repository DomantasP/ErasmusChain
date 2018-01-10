import React, { Component } from 'react'

import UniversityCardContainer from '../universitycard/UniversityCardContainer'

class StudentCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isUniversityActive: false
    }
  }

  toggleIsUniversityActive = () => {
    this.setState({
      isUniversityActive: !this.state.isUniversityActive
    })
  }

  renderOptions = () => {
    if (this.props.type === 'localStudents')
      return (
        <div>
          <button className="nav-button">Courses</button>
          <button
            className="nav-button"
            onClick={this.toggleIsUniversityActive}
          >
            Erasmus
          </button>
          <div className="student-card-university-container">
            {this.state.isUniversityActive ? (
              <UniversityCardContainer studentsID={this.props.student.id} />
            ) : (
              ''
            )}
          </div>
        </div>
      )

    if (this.props.type === 'erasmusStudents')
      return (
        <div>
          <button className="nav-button">Marking</button>
          <button className="nav-button">Set finished</button>
        </div>
      )
  }

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
        {this.renderOptions()}
      </div>
    )
  }
}

export default StudentCard
