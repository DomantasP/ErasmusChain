import React, { Component } from 'react'

class ValidateCourse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeId: '',
      mark: '',
      isDone: false,
      isEditSectionActive: false
    }
  }

  componentWillMount = () => {
    this.props.fetchCourses(this.props.studentsID)
  }

  renderCourses = () => {
    if (this.props.courses)
      return this.props.courses.map(course => (
        <div className="course-list-item" key={course.id}>
          <p>
            <span>
              <strong>ID: </strong>
              {course.id}
            </span>

            <span>
              <strong>Title: </strong>
              {course.title}
            </span>
            <span>
              <strong>Credits: </strong>
              {course.credits}
            </span>
            <span>
              <strong>Mark: </strong>
              {course.mark}
            </span>
            <span>
              <strong>Is finished: </strong>
              {course.isDone.toString()}
            </span>
          </p>
          <button className="nav-button" onClick={this.toogleEdit(course.id)}>
            Edit
          </button>
        </div>
      ))
  }

  toogleEdit = courseId => () =>
    this.setState({
      isEditSectionActive: !this.state.isEditSectionActive,
      activeId: courseId
    })

  validateCourse = () => {
    this.props.validateCourse(
      this.props.studentsID,
      this.state.activeId,
      this.state.mark,
      this.state.isDone
    )
    this.setState({
      mark: '',
      isDone: false
    })
  }

  handleMarkChange = e =>
    this.setState({
      mark: e.target.value
    })

  handleIsDoneChange = e =>
    this.setState({
      isDone: !this.state.isDone
    })

  render() {
    return (
      <div className="course-add-input courses-validate-input">
        <h2>{this.props.studentsID} courses: </h2>
        {this.renderCourses()}
        {this.state.isEditSectionActive ? (
          <div>
            <p> Enter the course information: </p>
            <p>
              <label>Mark:</label>
              <input onChange={this.handleMarkChange} value={this.state.mark} />
            </p>
            <p>
              <label>Is completed:</label>
              <input
                onChange={this.handleIsDoneChange}
                value={this.state.isDone}
                type="checkbox"
              />
            </p>
            <button className="nav-button" onClick={this.validateCourse}>
              Save
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default ValidateCourse
