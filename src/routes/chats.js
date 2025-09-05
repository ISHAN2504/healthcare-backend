// src/routes/chats.js
import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Send message
router.post("/", authMiddleware, async (req, res) => {
  const { receiver_id, message } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO chats (sender_id, receiver_id, message) VALUES ($1,$2,$3) RETURNING *",
      [req.user.user_id, receiver_id, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get conversation between two users
router.get("/:receiver_id", authMiddleware, async (req, res) => {
  const { receiver_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM chats WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1) ORDER BY sent_at ASC",
      [req.user.user_id, receiver_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
