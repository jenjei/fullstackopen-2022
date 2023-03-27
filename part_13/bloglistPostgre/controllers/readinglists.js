const router = require('express').Router()
const { Readinglist, User } = require('../models/index')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async(req, res) => {
    const readinglists = await Readinglist.findAll({})

    if (readinglists) {
        res.json(readinglists)
     } else {
        throw Error('Database empty')
     }
})

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

router.put('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const readinglist = await Readinglist.findByPk(req.params.id)

    if (readinglist) {
        if (user.id === readinglist.userId) {
            readinglist.read = req.body.read
            await readinglist.save()
            res.json(readinglist)
        } else {
            throw Error('Unauthorized')
        }
    }
    else {
        throw Error('Readinglist not found')
    }

})

module.exports = router