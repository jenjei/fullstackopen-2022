const router = require('express').Router()
const { Readinglist } = require('../models/index')

router.post('/', async (req, res) => {
    const {userId, blogId} = req.body
    console.log(req.body)

    const readingList = Readinglist.create({
        userId: userId,
        blogId: blogId
    })

    console.log(readingList)

    if(readingList) {
        res.json(readingList)
    } else {
        throw Error('No data')
    }
})

module.exports = router