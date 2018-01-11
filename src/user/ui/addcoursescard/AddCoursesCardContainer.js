import { connect } from 'react-redux'
import AddCoursesCard from './AddCoursesCard'
import { fetchCourses, setCourse, removeCourse } from './AddCoursesCardActions'

const mapStateToProps = (state, ownProps) => {
  return {
    courses:
      state.user.students.find(s => s.id === ownProps.studentsID).courses || [],
    id: '',
    title: '',
    credits: ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCourses: studentsID => {
      dispatch(fetchCourses(studentsID))
    },
    setCourse: (studentsID, id, title, credits) => {
      dispatch(setCourse(studentsID, id, title, credits))
    },
    removeCourse: (studentsID, id) => {
      dispatch(removeCourse(studentsID, id))
    }
  }
}

const AddCoursesCardContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddCoursesCard
)

export default AddCoursesCardContainer
