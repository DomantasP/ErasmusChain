import React from 'react'
import { connect } from 'react-redux'
import { toggleErrorNotification } from '../userActions'

const ErrorNotification = ({ message, errorMessageIsActive, onClick }) => {
  return (
    <div
      className={
        errorMessageIsActive
          ? 'active success-notification-container'
          : 'success-notification-container'
      }
    >
      <div className="success-notification">
        <img src="/assets/error.png" alt="Books" className="welcome-icon" />
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
    errorMessageIsActive: state.user.errorMessageIsActive,
    message: ownProps.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: event => {
      event.preventDefault()

      ownProps.clearFields()
      dispatch(toggleErrorNotification())
    }
  }
}

const ErrorNotificationContainer = connect(mapStateToProps, mapDispatchToProps)(
  ErrorNotification
)

export default ErrorNotificationContainer
