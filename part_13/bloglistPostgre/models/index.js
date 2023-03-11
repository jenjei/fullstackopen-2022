// this file will eliminate the need to import files defining individual models in the rest of the application
const Blog = require('./blog')

Blog.sync()

module.exports = {
  Blog
}