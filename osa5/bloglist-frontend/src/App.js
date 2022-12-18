import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('') // message types: success => green, error => red
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll()
    .then(blogs => setBlogs( blogs ))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Notification message={errorMessage} type={messageType}/>
      <div>
        <p>username: </p><input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <p>password: </p><input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>add new blog</button>
        </div>
        <div style={showWhenVisible}>
          <AddBlogForm 
          blogs={blogs}
          setBlogs={setBlogs}
          />
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
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

  const handleLikeClick = async(name) => {
    console.log('clicked like to', name)
    const likedBlog = blogs.filter(blog => blog.title===name)
    console.log('liked blog', likedBlog[0])
    const likes = likedBlog[0].likes + 1
    console.log('new likes', likes)

    const changedBlog = {
      author: likedBlog[0].author,
      title: likedBlog[0].title,
      url: likedBlog[0].url,
      likes: likes
    }

    await blogService.update(likedBlog[0].id, changedBlog)
    setBlogs(blogs.map(blog => blog.id !== likedBlog[0].id ? blog : changedBlog))
  }


  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
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

  return (
    <div>
    {user === null ?
    loginForm() :
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => handleLogout()}>log out</button>
        {blogForm()}
        <h2>all blogs</h2>
        {blogs.map((blog, id) => <Blog key={id} blog={blog} handleDeleteClick={handleDeleteClick} handleLikeClick={handleLikeClick} />)}
      </div>
    }
    </div>
  )
}

export default App
