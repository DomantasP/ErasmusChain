import React from 'react'

const LoginButton = ({ onLoginUserClick }) => {
  return (
    <li>
      <a
        href="#"
        className="nav-button"
        onClick={event => onLoginUserClick(event)}
      >
        Login
      </a>
    </li>
  )
}

export default LoginButton
