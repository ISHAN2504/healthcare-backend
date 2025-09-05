// src/routes/patients.js
import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get patient profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE user_id=$1",
      [req.user.user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book appointment
router.post("/book", authMiddleware, async (req, res) => {
  const { physician_id, date_time } = req.body;
  try {
    const patient = await pool.query("SELECT patient_id FROM patients WHERE user_id=$1", [req.user.user_id]);
    const appointment = await pool.query(
      "INSERT INTO appointments (patient_id, physician_id, date_time, status) VALUES ($1,$2,$3,$4) RETURNING *",
      [patient.rows[0].patient_id, physician_id, date_time, "pending"]
    );
    res.json(appointment.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
