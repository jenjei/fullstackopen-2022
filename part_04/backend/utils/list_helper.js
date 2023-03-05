// tests in this file
var _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

// this function returns the total sum of likes
const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    var blog = blogs.find(blog => blog.likes)
    return blog.likes
  }
  else {
    var totalLikes = blogs.reduce(function (sum, blog) {
      console.log('hello', sum, blog.likes)
      return sum + blog.likes
    }, 0)
    return totalLikes
  }
}

// this function returns the most liked (favorite) blog
const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce(function(prev, current) {
    console.log('previous', prev, 'current', current)
    return (prev.likes > current.likes) ? prev : current
  }) //returns object
  return { title: favoriteBlog.title, author: favoriteBlog.author, likes: favoriteBlog.likes }
}

// this function returns author with most blogs written
const authorWithMostBlogs = (blogs) => {
  var authorsByBlogAmounts = _.countBy(blogs, 'author') // reorganising authors by blog count
  var mostBlogs = _.max(_.values(authorsByBlogAmounts)) // finding out amount of most authored blogs
  var author = _.findKey(authorsByBlogAmounts, (key) => key === mostBlogs) // finding out who is the author of most blogs
  console.log('authors by blog amounts', authorsByBlogAmounts)
  return { author: author, blogs: mostBlogs }
}

// this function returns author with most likes
const authorWithMostLikes = (blogs) => {
  var likesSummedByAuthor = _(blogs)
    .groupBy('author') // first grouping blogs by authors
    .map((objs, key) => {
      return {
        'author': key,
        'likes': _.sumBy(objs, 'likes') // ...then calculating likes
      }})
    .value() // returns array of [{author,likes},{author,likes},{author,likes}]
  const favoriteAuthor = likesSummedByAuthor.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current }) // finding favorite author same way like favorite blog
  console.log('favorite author', favoriteAuthor)

  return favoriteAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes
}