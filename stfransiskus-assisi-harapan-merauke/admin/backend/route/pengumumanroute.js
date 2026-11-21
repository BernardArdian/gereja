const express = require("express");
const router = express.Router();
const Pengumuman = require("../../model/katekese/pengumuman/pengumuman");
const authMiddleware = require("../midleware/authMiddleware");

// Route CRUD pengumuman lama yang saat ini memanggil service event.

//create event(pengumuman)
router.post("/", authMiddleware, (req, res) => {
  try {
    const pengumumanPost = EvetnSerVice.createEvent(req.body);
    res.status(201).json(eventPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all event
router.get("/", (reg, res) => {
  try {
    const eventGetAll = EvetnSerVice.getAllEvent();
    res.json(eventGetAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all event with id
router.get("/:id", (reg, res) => {
  try {
    const eventGetByid = EvetnSerVice.getAllEventById(reg.params.id);
    res.json(eventGetByid);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//update event(pengumuman)
router.put("/:id", authMiddleware, (reg, res) => {
  try {
    const eventUpdate = EvetnSerVice.updateEvent(reg.params.id, reg.body);
    res.json(eventUpdate);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//delete event(pengumuman)
router.delete("/:id", authMiddleware, (reg, res) => {
  try {
    const eventDelete = EvetnSerVice.deleteEvent(reg.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
