const router = require('express').Router()
const Nomination = require('../db/models/nomination')

module.exports = router

// const apiKey = require('./../../secrets')

// GET route
// fetch nominations list
router.get('/', async (req, res, next) => {
  try {
    let list = await Nomination.findAll()
    if (list) res.json(list)
    else res.status(404).send('Nothing here yet!')
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// POST route
// add new nomination
router.post('/', async (req, res, next) => {
  try {
    await Nomination.create(req.body)
    return res.sendStatus(200)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// DELETE route
// remove nomination
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    if (id) {
      await Nomination.destroy({
        where: {
          id: id
        }
      })
      res.sendStatus(204)
    }
  } catch (err) {
    console.log(id)
    console.error(id)
    next(err)
  }
})
