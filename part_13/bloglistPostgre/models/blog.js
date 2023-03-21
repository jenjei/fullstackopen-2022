// blog modelling

const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.TEXT
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

module.exports = Blog