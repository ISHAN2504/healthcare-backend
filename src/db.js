import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render provides this
  ssl: {
    rejectUnauthorized: false, // important for Render PostgreSQL
  },
});

export default pool;
