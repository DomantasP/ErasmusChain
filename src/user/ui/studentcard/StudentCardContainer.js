import { connect } from 'react-redux'
import StudentCard from './StudentCard'
import { fetchStudents } from './StudentCardActions'

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.user.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents: () => {
      dispatch(fetchStudents())
    }
  }
}

const StudentCardContainer = connect(mapStateToProps, mapDispatchToProps)(
  StudentCard
)

export default StudentCardContainer
