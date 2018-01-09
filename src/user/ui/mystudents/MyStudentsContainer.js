import { connect } from 'react-redux'
import MyStudents from './MyStudents'
import { fetchStudents } from './MyStudentsActions'

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.user.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents: type => {
      dispatch(fetchStudents(type))
    }
  }
}

const MyStudentsContainer = connect(mapStateToProps, mapDispatchToProps)(
  MyStudents
)

export default MyStudentsContainer
