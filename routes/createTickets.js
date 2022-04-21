const express = require("express");
const router = express.Router();
const { CreateTickets } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const listOfTickets = await CreateTickets.findAll();
  res.json(listOfTickets);
});

router.post("/", async (req, res) => {
  const createticket = req.body;
  await CreateTickets.create(createticket);
  res.json(createticket);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const ticket = await CreateTickets.findByPk(id);
  res.json(ticket);
});

module.exports = router;
