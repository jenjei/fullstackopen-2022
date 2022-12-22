import React from 'react'
import { useState } from 'react'
import Notification from './Notification'
import './login.css'

const LoginForm = ({
  handleLogin,
  errorMessage,
  messageType,
  username,
  password,
  setUsername,
  setPassword,
  createUser
}) => {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setNewPassword(event.target.value)
  }

  const handleCreateUserClick = async(event) => {
    event.preventDefault()

    const userObject = {
      name: newName,
      username: newUsername,
      password: newPassword
    }

    createUser(userObject)
    setNewName('')
    setNewUsername('')
    setNewPassword('')
  }

  return (
    <div>
      <form className='card' onSubmit={handleLogin}>
        <h2>Login</h2>
        <Notification message={errorMessage} type={messageType}/>
        <div>
          <input
            id='username'
            type="text"
            placeholder='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          /><p></p>
          <input
            id='password'
            type="password"
            placeholder='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>

      <form className='card' onSubmit={handleCreateUserClick}>
        <h2>Create User</h2>
        <div>
          <p>your name: </p><input
            id='name'
            type="text"
            placeholder='name'
            value={newName}
            name="newName"
            onChange={handleNameChange}
          />
          <p>your new username: </p><input
            id='newUsername'
            type="text"
            placeholder='username'
            value={newUsername}
            name="newUsername"
            onChange={handleUsernameChange}
          />
          <p>your new password: </p><input
            id='newPassword'
            type="newPassword"
            placeholder='password'
            value={newPassword}
            name="newPassword"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='create-user-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default LoginForm