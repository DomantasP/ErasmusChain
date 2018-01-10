import { connect } from 'react-redux'
import StudentCard from './StudentCard'

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.user.students
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const StudentCardContainer = connect(mapStateToProps, mapDispatchToProps)(
  StudentCard
)

export default StudentCardContainer
