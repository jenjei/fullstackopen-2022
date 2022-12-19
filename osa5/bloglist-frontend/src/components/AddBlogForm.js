import { useState } from 'react'

const AddBlogForm = ( {createBlog} ) => {

    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')

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

    const handleAddBlogClick = async(event) => {
        event.preventDefault();
    
        const blogObject = {
          author: newAuthor,
          title: newTitle,
          url: newUrl,
          likes: 0,
        }
    
        createBlog(blogObject)
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }


    return (
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
}

export default AddBlogForm