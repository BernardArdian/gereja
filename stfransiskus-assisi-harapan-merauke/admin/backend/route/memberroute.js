const express = require("express");
const router = express.Router();
const memberService = require("../service/member/memberservice");
const authMiddleware = require("../midleware/authMiddleware");
const mongoose = require("mongoose");

function sendError(res, error, fallbackStatus = 500) {
  res
    .status(error.statusCode || fallbackStatus)
    .json({ error: error.message || "Terjadi kesalahan pada data umat." });
}

router.post("/inputmember", async (req, res) => {
  try {
    const member = await memberService.createMember(req.body);
    res.status(201).json(member);
  } catch (error) {
    sendError(res, error, 400);
  }
});

router.get("/displaymember", async (_req, res) => {
  try {
    const members = await memberService.getAllMember();
    res.status(200).json(members);
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const member = await memberService.getAllMemberById(req.params.id);
    res.status(200).json(member);
  } catch (error) {
    sendError(res, error, 400);
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const member = await memberService.updateMember(req.params.id, req.body);
    res.status(200).json(member);
  } catch (error) {
    sendError(res, error, 400);
  }
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID umat tidak valid." });
  }

  try {
    const member = await memberService.deleteMember(req.params.id);
    res.status(200).json(member);
  } catch (error) {
    sendError(res, error, 400);
  }
});

module.exports = router;
