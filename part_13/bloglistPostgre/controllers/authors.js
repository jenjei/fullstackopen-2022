const router = require('express').Router()
const { Blog } = require('../models/index')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res) => {

    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('*')), 'blogs'],
            'likes',
        ],
        group:['author', 'likes'],
        order: [
            [sequelize.fn('max', sequelize.col('likes')), 'DESC']
        ]
     })
    
     if (authors) {
        res.json(authors)
     } else {
        throw Error('Database empty')
     }
})

module.exports = router