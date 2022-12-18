import './blog.css'
import { useState } from 'react'

const Blog = ({blog, handleLikeClick, handleDeleteClick}) => { 
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
    <div style={hideWhenVisible} className="box">
      <b onClick={() => setLoginVisible(true)} className="collapsible">► {blog.title}</b>
    </div>
    <div className="box-expanded" style={showWhenVisible}>
      <div className="box-align-right"><button className="deletebutton" onClick={() => handleDeleteClick(blog.id)}>x</button></div>
      <div className="textdiv">
        <b onClick={() => setLoginVisible(false)} className="collapsible">▼ {blog.title}</b>
        <p>by {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p className="liketext">Likes {blog.likes}</p>
      </div>
      <button className="likebutton" onClick={() => handleLikeClick(blog.title)}>♥</button>
    </div>
    </div>
  )
}

export default Blog