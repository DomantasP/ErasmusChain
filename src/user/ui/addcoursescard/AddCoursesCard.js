import React, { Component } from 'react'

class AddCoursesCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      credits: ''
    }
  }

  componentWillMount = () => {
    this.props.fetchCourses(this.props.studentsID)
  }

  removeCourse = id => {
    return () => this.props.removeCourse(this.props.studentsID, id)
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
          <button className="nav-button" onClick={this.removeCourse(course.id)}>
            Remove
          </button>
        </div>
      ))
  }

  handleChange = type => {
    let change = {}
    return e => {
      change[type] = e.target.value
      this.setState(change)
    }
  }

  setCourse = () => {
    this.props.setCourse(
      this.props.studentsID,
      this.state.id,
      this.state.title,
      this.state.credits
    )
    this.setState({
      id: '',
      title: '',
      credits: ''
    })
  }

  render() {
    return (
      <div className="course-add-input">
        {this.renderCourses()}
        <p> Enter the course information: </p>
        <p>
          <label>Id:</label>
          <input onChange={this.handleChange('id')} value={this.state.id} />
        </p>
        <p>
          <label>Title:</label>
          <input
            onChange={this.handleChange('title')}
            value={this.state.title}
          />
        </p>
        <p>
          <label>Credits:</label>
          <input
            onChange={this.handleChange('credits')}
            value={this.state.credits}
          />
        </p>
        <button className="nav-button" onClick={this.setCourse}>
          Add
        </button>
      </div>
    )
  }
}

export default AddCoursesCard
