const express = require("express");
const router = express.Router();
const newsService = require("../service/news/newsservice");
const authMiddleware = require("../midleware/authMiddleware");

router
  .post("/input-news", authMiddleware, async (req, res) => {
    try {
      const result = await newsService.inputNews(req.body);
      res.status(201).json(result);
    } catch (error) {
      const status = error.statusCode || 400;
      res.status(status).json({ error: error.message });
    }
  })
  router.get("/display-news", async (req, res) => {});

  module.exports = router;