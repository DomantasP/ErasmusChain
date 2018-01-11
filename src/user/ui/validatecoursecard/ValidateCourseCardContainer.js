import { connect } from 'react-redux'
import ValidateCourseCard from './ValidateCourseCard'
import { fetchCourses } from '../addcoursescard/AddCoursesCardActions'
import { validateCourse } from './ValidateCourseCardActions'

const mapStateToProps = (state, ownProps) => {
  return {
    courses:
      state.user.students.find(s => s.id === ownProps.studentsID).courses || [],
    mark: '',
    isDone: '',
    studentsID: ownProps.studentsID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCourses: studentsID => {
      dispatch(fetchCourses(studentsID))
    },
    validateCourse: (studentsID, id, mark, isDone) => {
      dispatch(validateCourse(studentsID, id, mark, isDone))
    }
  }
}

const ValidateCourseCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateCourseCard)

export default ValidateCourseCardContainer
