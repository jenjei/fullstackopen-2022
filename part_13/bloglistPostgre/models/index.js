// this file will eliminate the need to import files defining 
// individual models in the rest of the application
const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

// one to many relation
User.hasMany(Blog)
Blog.belongsTo(User)

// many to many relation:
User.belongsToMany(Blog, { through: Readinglist, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: Readinglist, as: 'usersMarked' }) 

module.exports = {
  Blog,
  User,
  Readinglist
}