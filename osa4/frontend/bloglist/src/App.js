import { useState } from "react"
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([
    {
      author: 'Nalle Puh',
      title: 'Tarinoita Puolenhehtaarin metsästä',
      url: 'www.google.com'
    }
  ])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleAddBlogClick = (event) => {
    event.preventDefault();

    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    }

    setBlogs(blogs.concat(blogObject))
    console.log('blogs:', blogs)
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
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

  return (
    <div className="App">
      <h1>Blogs</h1>
      <p>Add new blog below</p>
      <form onSubmit={handleAddBlogClick}>
        <input placeholder="Author" value={newAuthor} onChange={handleAuthorChange}></input>
        <input placeholder="Title" onChange={handleTitleChange}></input>
        <input placeholder="URL" onChange={handleUrlChange}></input>
        <button>Add</button>
      </form>
      <h2>All Blogs</h2>
      <div>
        {blogs.map((blog, id) => <div key={id}> <p><b>{blog.title}</b> by {blog.author}</p> <ul>{blog.url}</ul> </div>)}
      </div>
    </div>
  );
}

export default App;
