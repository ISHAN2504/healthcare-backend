import express from "express";
import pool from "../db.js";  // this is your database connection

const router = express.Router();

// A simple GET endpoint to test database connection
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ server_time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

export default router;
