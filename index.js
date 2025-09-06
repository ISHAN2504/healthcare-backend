// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./src/routes/test.js"; 
import authRoutes from "./src/routes/auth.js";
import patientRoutes from "./src/routes/patients.js";
import physicianRoutes from "./src/routes/physicians.js";
import appointmentRoutes from "./src/routes/appointments.js";
import chatRoutes from "./src/routes/chats.js";

dotenv.config();
const app = express();


app.use("/api/test", testRoutes);
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
