import React from 'react'
import { connect } from 'react-redux'
import { toggleSuccessNotification } from '../userActions'

const SuccessNotification = ({ message, successMessageIsActive, onClick }) => {
  return (
    <div
      className={
        successMessageIsActive
          ? 'active success-notification-container'
          : 'success-notification-container'
      }
    >
      <div className="success-notification">
        <img src="/assets/book.png" alt="Books" className="welcome-icon" />
        <p>{message}</p>
        <button className="nav-button" onClick={onClick}>
          Okay
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    successMessageIsActive: state.user.successMessageIsActive,
    message: ownProps.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: event => {
      event.preventDefault()

      ownProps.clearFields()
      dispatch(toggleSuccessNotification())
    }
  }
}

const SuccessNotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessNotification)

export default SuccessNotificationContainer
