// this file will eliminate the need to import files defining 
// individual models in the rest of the application
const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog) // one to many relation
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Blog,
  User
}