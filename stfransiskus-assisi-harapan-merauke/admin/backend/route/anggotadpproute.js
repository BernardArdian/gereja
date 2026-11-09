const express = require("express");
const router = express.Router();
const dppService = require("../service/dpp/memberDppService");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../midleware/authMiddleware");

//input dan tampilkan
router
  .post("/anggota-dpp", authMiddleware, async (req, res) => {
    try {
      const { id, nama, jabatan, periode } = req.body;

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "kosong atau tidak valid" });
      }

      const missingFields = [];
      if (!nama?.trim()) missingFields.push("nama");
      if (!jabatan?.trim()) missingFields.push("jabatan");
      if (!periode?.trim()) missingFields.push("periode");

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Field wajib : ${missingFields.join(",")} diisi`,
        });
      }

      const result = dppService.createDppMember({
        id,
        nama,
        jabatan,
        periode,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .get("/anggota-dpp/list-dpp", async (req, res) => {
    try {
      const dpp = await dppService.getAllDppMember();
      return dpp;
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .get("anggota-dpp/anggota-dpp/:id", async (req, res) => {
    try {
      const dpp = await dppService.getAllDppMemberById();
      return dpp;
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

//edit dan delete
router
  .put("/:id", authMiddleware, async (req, res) => {
    try {
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })
  .delete("/:id", authMiddleware, async (req, res) => {
    try {
      const result = await dppService.deleteDppMember(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
