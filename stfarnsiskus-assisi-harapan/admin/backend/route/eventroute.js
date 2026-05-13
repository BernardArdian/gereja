const express = require('express')
const router = express.Router()
const EvetnSerVice = require('../service/event/eventgerejaservice')

//create event(pengumuman)
router.post('/', (req, res) => {
    try {
        const eventPost = EvetnSerVice.createEvent(req.body)
        res.status(201).json(eventPost)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})
 
//get all event
router.get('/', (reg, res) => {
    try {
        const eventGetAll = EvetnSerVice.getAllEvent()
        res.json(eventGetAll)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//get all event with id
router.get('/:id', (reg, res) => { 
    try {
        const eventGetByid = EvetnSerVice.getAllEventById(reg.params.id)
        res.json(eventGetByid)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
})


//update event(pengumuman)
router.put('/:id', (reg, res) => { 
    try {
        const eventUpdate = EvetnSerVice.updateEvent(reg.params.id, reg.body)
        res.json(eventUpdate)   
    } catch (error) {
        res.status(404).json({error : error.message})
    }
})


//delete event(pengumuman)
router.delete('/:id', (reg, res) => {
    try { 
        const eventDelete = EvetnSerVice.deleteEvent(reg.params.id)
        res.status(204).send()   
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})


module.exports = router