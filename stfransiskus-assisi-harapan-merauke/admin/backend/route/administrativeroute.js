const express = require("express");
const router = express.Router();
const administratifService = require("../service/administrasi/administratifservice");

//sakrament
router.post("/syarat-administratif-sakramen", async (req, res) => {
    try {
        const result = await administratifService.inputSyaratAdministratif(req.body);
        res.status(201).json(result);
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ error: error.message });
    }
}).get("/display-syarat-administratif-sakramen", async (req, res) => {
  try {
    const syaratBaptis = await administratifService.getSyaratAdministratifById();
    res.status(200).json(syaratBaptis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//edit n delete
router.put("/:id", async (req, res) => {
  try {
    const result = await administratifService.updateSyaratBaptis(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}).delete("/:id", async (req, res) => {
  try {
    const result = await administratifService.deleteSyaratBaptis(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//sakrament

//member DPP
router.post("/input-memberdpp", async (req, res) => {
    try {
        const result = await administratifService.inputMemberDPP(req.body);
        res.status(201).json(result);
    } catch (error) {
        const status = error.statusCode || 400;
        res.status(status).json({ error: error.message });
    }
}).get("/list-memberdpp", async (req, res) => {
  try {
    const syaratBaptis = await administratifService.getStrukturMemberDPPById();
    res.status(200).json(syaratBaptis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//edit n delete
router.put("/:id", async (req, res) => {
  try {
    const result = await administratifService.updateSyaratBaptis(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}).delete("/:id", async (req, res) => {
  try {
    const result = await administratifService.deleteSyaratBaptis(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;