import { connect } from 'react-redux'
import UniversityCard from './UniversityCard'
import { addUniversity } from './UniversityCardActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    addUniversity: (studentId, address) => {
      dispatch(addUniversity(studentId, address))
    }
  }
}

const UniversityCardContainer = connect(mapStateToProps, mapDispatchToProps)(
  UniversityCard
)

export default UniversityCardContainer
