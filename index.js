// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import patientRoutes from "./routes/patients.js";
import physicianRoutes from "./routes/physicians.js";
import appointmentRoutes from "./routes/appointments.js";
import chatRoutes from "./routes/chats.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/physicians", physicianRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/chats", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
