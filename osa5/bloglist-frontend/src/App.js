import { useState, useEffect, useRef } from 'react'
import './app.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('') // message types: success => green, error => red
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('logged user', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)

    setErrorMessage(`Added ${blogObject.title}`)
    setMessageType('success')
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType('')
      console.log('timeout')
      blogService.getAll()
        .then(blogs => setBlogs(blogs))
    }, 5000)
  }

  const handleDeleteClick = (id) => {
    console.log('clicked delete', id)
    const filteredBlog = blogs.filter(blog => blog.id === id)
    const blogTitle = filteredBlog[0].title
    const blogId = filteredBlog[0].id

    if (window.confirm(`Delete ${blogTitle} ?`)) {
      blogService
        .remove(blogId)
      console.log(`${blogTitle} successfully deleted`)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    }
  }

  const handleLikeClick = (id) => {
    console.log('clicked like to', id)
    const findLikedBlog = blogs.filter(blog => blog.id===id)
    const likedBlog = findLikedBlog[0]
    console.log('liked blog', likedBlog)
    const likes = likedBlog.likes + 1
    console.log('new likes', likes)
    let userId = likedBlog.user.id // without this, everything will fail with "(type Object) at path "user" because of "BSONTypeError" "

    if (userId === undefined) {
      userId = likedBlog.user
    }
    const changedBlog = { ...likedBlog, user: userId, likes: likes } // must update userid and likes

    console.log('changed blog', changedBlog)

    blogService.update(likedBlog.id, changedBlog)
      .then(setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : changedBlog)))
  }

  const handleCreateUser = (newUser) => {
    console.log('clicked create new user')
    userService.create(newUser)

    setErrorMessage(`Created user: ${newUser.username}`)
    setMessageType('success')
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType('')
    }, 5000)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('username and password', username, password)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessageType('')
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async() => {
    console.log('log out clicked')
    window.localStorage.clear()
    blogService.setToken(null)
    window.location.reload()
  }

  const test = () => {
    console.log('testing expansion click') // this is very unnecessary function
  }

  return (
    <div>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          messageType={messageType}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          createUser={handleCreateUser}  /> :
        <div>
          <p>{user.name} logged in</p>
          <button className='logout-button' onClick={() => handleLogout()}>log out</button>
          <div> <br /> </div>
          <Notification message={errorMessage} type={messageType}/>
          <Togglable buttonLabel="add new blog" ref={blogFormRef}>
            <AddBlogForm
              createBlog={addBlog}
            />
          </Togglable>
          <h2>all blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, id) =>
              <Blog key={id}
                blog={blog}
                user={user}
                handleDeleteClick={handleDeleteClick}
                handleLikeClick={handleLikeClick}
                test={test}
              />)}
        </div>
      }
    </div>
  )
}

export default App
