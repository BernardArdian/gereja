const express = require("express");
const router = express.Router();
const memberService = require("../service/member/memberservice");
const authMiddleware = require("../midleware/authMiddleware");
const mongoose = require("mongoose");

//input, display, update, delete member
router.post("/inputmember", async (req, res) => {
  try {
    const result = await memberService.createMember(req.body);
    res.status(201).json(result);
  } catch (error) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
}).get("/displaymember", async (req, res) => {
  try {
    const members = await memberService.getAllMember();
    res.status(200).json(members);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID tidak valid" });
  }

  try {
    const result = await memberService.deleteMember(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
