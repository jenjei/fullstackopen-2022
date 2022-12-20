import './blog.css'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, user, handleLikeClick, handleDeleteClick}) => { 
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const deleteButton = () => (
    <div className="box-align-right">
      <button className="deletebutton" onClick={() => handleDeleteClick(blog.id)}>x</button>
    </div>
  )

  const nothing = () => (
    <div className='no-delete-button'></div>
  )

  return (
    <div>
    <div style={hideWhenVisible} className="box">
      <b onClick={() => setLoginVisible(true)} className="collapsible">► {blog.title}</b>
    </div>

    <div className="box-expanded" style={showWhenVisible}>

      {user.username === blog.user.username ? deleteButton() : nothing() }

      <div className="textdiv">
        <b onClick={() => setLoginVisible(false)} className="collapsible">▼ {blog.title}</b>
        <p>by {blog.author} | <small>added by {blog.user.username}</small></p>
        <a href={blog.url}>{blog.url}</a>
        <p className="liketext">Likes {blog.likes}</p>
      </div>
      <button className="likebutton" onClick={() => handleLikeClick(blog.id)}>♥</button>
    </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired
}

export default Blog