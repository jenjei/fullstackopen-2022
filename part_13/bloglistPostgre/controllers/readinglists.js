const router = require('express').Router()
const { Readinglist, User } = require('../models/index')

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
        throw Error('Readinglist error')
    }
})

router.put('/:id', async (req, res) => {
    const readinglist = await Readinglist.findByPk(req.params.id)

    readinglist.read = req.body.read
    await readinglist.save()
    
    if (readinglist) {
        res.json(readinglist)
    }
    else {
        throw Error('Readinglist not found')
    }

})

module.exports = router