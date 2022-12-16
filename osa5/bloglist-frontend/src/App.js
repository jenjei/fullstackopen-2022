import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('') // message types: success => green, error => red

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

  const blogForm = () => (
    <form onSubmit={handleAddBlogClick}>
      <h3>add new blog</h3>
      <Notification message={errorMessage} type={messageType}/>
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
    setErrorMessage(`Added ${blogObject.title}`)
    console.log('error message', errorMessage)
    setMessageType('success')
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType('')
    }, 5000)
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
