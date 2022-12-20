import './blog.css'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikeClick, handleDeleteClick, test }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

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
      <div style={hideWhenVisible} onClick={() => test()} className="box">
        <b onClick={() => setDetailsVisible(true)} data-testid="not-expanded-title-test" className="collapsible">► {blog.title}</b>
      </div>

      <div className="box-expanded" style={showWhenVisible}>

        {user.username === blog.user.username ? deleteButton() : nothing() }

        <div className="textdiv">
          <b onClick={() => setDetailsVisible(false)} data-testid="expanded-title-test" className="collapsible">▼ {blog.title}</b>
          <p data-testid="author-n-username-test">by {blog.author} | <small>added by {blog.user.username}</small></p>
          <a href={blog.url} data-testid="url-test">{blog.url}</a>
          <p className="liketext" data-testid='likes-test'>Likes {blog.likes}</p>
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