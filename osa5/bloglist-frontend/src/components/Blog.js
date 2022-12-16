import './blog.css'

const Blog = ({blog, handleLikeClick, handleDeleteClick}) => (
  <div className="box">
  <div className="box-align-right"><button className="deletebutton" onClick={() => handleDeleteClick(blog.id)}>x</button></div>
  <div className="textdiv">
    <b>{blog.title}</b>
    <p>by {blog.author}</p>
    <a href={blog.url}>{blog.url}</a>
    <p className="liketext">Likes {blog.likes}</p>
    </div>
    <button className="likebutton" onClick={() => handleLikeClick(blog.title)}>♥</button>
</div> 
)

export default Blog