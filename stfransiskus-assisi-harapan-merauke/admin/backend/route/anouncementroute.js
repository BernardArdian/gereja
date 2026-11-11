const express = require("express");
const router = express.Router();
const anouncementServices = require("../service/pengumuman/pengumuman");
const mongoose = require("mongoose");

// Terima data pengumuman baru dan kembalikan dokumen yang dibuat.
router.post("/input-anouncement", async (req, res) => {
  try {
    const result = await anouncementServices.input_anouncemet(req.body);
    res.status(201).json(result);
  } catch (error) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
});

router.get("/anoumncement-list", async (req, res) => {
  // Endpoint ini dimaksudkan untuk mengambil daftar pengumuman.
  try {
    const result = await anouncementServices.getAnouncement; // pastikan pakai method getAllAdmins

    return res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await anouncementServices.updateAnouncemnet(
      req.params.id,
      req.body,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  // Pastikan parameter memiliki format ObjectId sebelum penghapusan dipanggil.
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID tidak valid" });
  }
  try {
    const result = await adminService.deleteAdmin(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
