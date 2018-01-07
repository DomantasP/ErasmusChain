import React from 'react'

const LogoutButton = ({ onLogoutUserClick }) => {
  return (
    <li>
      <a
        href="#"
        className="nav-button"
        onClick={event => onLogoutUserClick(event)}
      >
        Logout
      </a>
    </li>
  )
}

export default LogoutButton
