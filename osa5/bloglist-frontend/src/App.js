import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll()
    .then(blogs => setBlogs( blogs ))  
  }, [])

  useEffect(async() => {
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

  const handleAddBlogClick = async(event) => {
    event.preventDefault();

    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: 0,
    }

    await blogService.create(blogObject)
      console.log('post', blogObject)
      setBlogs(blogs.concat(blogObject))
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
    console.log('blogs:', blogs)
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

  const blogForm = () => (
    <form onSubmit={handleAddBlogClick}>
      <h3>add new blog</h3>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
        placeholder='author'
      />
      <input
        value={newTitle}
        onChange={handleTitleChange}
        placeholder='title'
      />
      <input
        value={newUrl}
        onChange={handleUrlChange}
        placeholder='url'
      />
      <button type="submit">add</button>
    </form>
  )

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) => {
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
        {blogs.map((blog, id) => <Blog key={id} blog={blog} handleDeleteClick={handleDeleteClick} handleAddBlogClick={handleAddBlogClick} />)}
      </div>
    }
    </div>
  )
}

export default App
