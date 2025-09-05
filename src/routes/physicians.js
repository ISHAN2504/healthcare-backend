// src/routes/physicians.js
import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Onboard physician
router.post("/onboard", authMiddleware, async (req, res) => {
  const { specialization, availability } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO physicians (user_id, specialization, availability) VALUES ($1,$2,$3) RETURNING *",
      [req.user.user_id, specialization, availability]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all approved physicians
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM physicians WHERE approved=true");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
