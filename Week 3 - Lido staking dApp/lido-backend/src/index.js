// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const LidoService = require("./lidoService");

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for frontend origin
app.use(cors({ origin: "http://localhost:3000" }));

// Parse JSON bodies globally
app.use(express.json());

// Ensure required env var is present
const { RPC_URL, LIDO_ADDRESS } = process.env;
if (!RPC_URL || !LIDO_ADDRESS) {
  console.error("Error: RPC_URL and LIDO_ADDRESS must be set in .env");
  process.exit(1);
}

// Initialize service
const lidoService = new LidoService(RPC_URL, LIDO_ADDRESS);

// In-memory store for user stakes
const userStakes = [];

// 1. Protocol-wide total staked ETH
app.get("/api/total-staked", async (req, res) => {
  try {
    const totalStakedETH = await lidoService.getTotalStaked();
    res.json({ totalStakedETH });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch total staked ETH" });
  }
});

// 2. Log a user stake
app.post("/api/log-stake", (req, res) => {
  const { user, amount } = req.body;
  if (!user || amount === undefined) {
    return res.status(400).json({ error: "user and amount required" });
  }
  userStakes.push({ user, amount: parseFloat(amount) });
  console.log(`Logged stake: user=${user}, amount=${amount}`);
  res.sendStatus(201);
});

// 3. Aggregated total for your app
app.get("/api/app-total-staked", (req, res) => {
  const total = userStakes.reduce((sum, s) => sum + s.amount, 0);
  res.json({ appTotalStakedETH: total });
});

// Start server
app.listen(port, () => {
  console.log(`Lido backend listening on http://localhost:${port}`);
});