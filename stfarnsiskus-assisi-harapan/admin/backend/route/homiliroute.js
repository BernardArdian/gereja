const express = require('express')
const router = express.Router()

const HomiliService = require('../service/event/homiliservice') 

router.post('/input-homili', async (req, res) => {
    try {
        const homili = await HomiliService.inputHomili(req.body);
        res.status(201).json(homili);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}).get('/diplay-homili', async (req, res) => {
    try {
        const homilis = await HomiliService.getHomili(req.query);
        res.json(homilis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}).get('/:id', async (req, res) => {
    try {
        const homili = await HomiliService.getHomili({ id: req.params.id });
        res.json(homili);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedHomili = await HomiliService.updateHomili(req.params.id, req.body);
        res.json(updatedHomili);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}).delete('/:id', async (req, res) => {
    try {
        const deletedHomili = await HomiliService.deleteHomili(req.params.id);
        res.json(deletedHomili);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})