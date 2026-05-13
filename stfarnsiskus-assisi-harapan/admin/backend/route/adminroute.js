const express = require("express");
const router = express.Router();
const adminService = require("../service/adminservice/adminservice");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const authMiddleware = require("../midleware/authMiddleware");

const Counter = mongoose.model(
  "Counter",
  new mongoose.Schema({
    _id: String,
    seq: { type: Number, default: 0 },
  })
);

const getNextSequence = async (name) => {
  const result = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return result.seq;
};

router.post("/login", async (req, res) => {
  try {
    const { adminname, password, role } = req.body;
    if (!adminname || !password || !role) {
      return res.status(400).json({ error: "Missing required field" });
    }

    const result = await adminService.adminLogin({ adminname, password, role });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}).get("/list-admin", authMiddleware, async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins(); // pastikan pakai method getAllAdmins
     // ← tambahkan ini
    return res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
})
  
  router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await adminService.updateAdmin(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("Register Body:", req.body);
    const { id, adminname, password, role } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Body JSON kosong atau tidak valid" });
    }

    const missingFields = [];
    if (!adminname?.trim()) missingFields.push("adminname");
    if (!password?.trim()) missingFields.push("password");
    if (!role?.trim()) missingFields.push("role");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `Field wajib: ${missingFields.join(", ")} diperlukan` });
    }

    const counter = await getNextSequence("adminId");
    const incrementId = `ADM${String(counter).padStart(3, "0")}-${uuidv4()}`;

    const result = await adminService.registerAdmin({
      id: incrementId,
      adminname,
      password,
      role,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}).delete("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await adminService.deleteAdmin(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
