import { connect } from 'react-redux'
import AddStudentForm from './AddStudentForm'
import { addStudent } from './AddStudentFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onAddStudentFormSubmit: (firstName, lastName, id) => {
      dispatch(addStudent(firstName, lastName, id))
    }
  }
}

const AddStudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddStudentForm
)

export default AddStudentFormContainer
