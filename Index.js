import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import studentRoutes from "./Routes/studentRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());



connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Student Portal API is running"
  });
});

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});