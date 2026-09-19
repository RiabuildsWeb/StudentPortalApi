import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import studentRoutes from "./Routes/studentRoutes.js";
import productRoutes from "./Routes/productRoutes.js"

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
app.use("/products",productRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});