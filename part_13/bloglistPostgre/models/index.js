// this file will eliminate the need to import files defining 
// individual models in the rest of the application
const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

// one to many relation
User.hasMany(Blog) // user has added many blogs
Blog.belongsTo(User) // blog belongs to one user

// many to many relation:
User.belongsToMany(Blog, { through: Readinglist, as: 'readings' }) // user has many blogs in the readinglists
Blog.belongsToMany(User, { through: Readinglist, as: 'usersMarked' }) // blog has many users in the readinglists

// one to many relation
Session.belongsTo(User) // one session belongs to one user
User.hasMany(Session) // one user can have many sessions, so one user can login through multiple devices

module.exports = {
  Blog,
  User,
  Readinglist,
  Session
}