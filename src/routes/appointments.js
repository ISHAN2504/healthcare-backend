// src/routes/appointments.js
import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get appointments for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    let query;
    if (req.user.role === "patient") {
      query = "SELECT * FROM appointments WHERE patient_id IN (SELECT patient_id FROM patients WHERE user_id=$1)";
    } else if (req.user.role === "physician") {
      query = "SELECT * FROM appointments WHERE physician_id IN (SELECT physician_id FROM physicians WHERE user_id=$1)";
    } else {
      query = "SELECT * FROM appointments"; // admin
    }
    const result = await pool.query(query, [req.user.user_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
