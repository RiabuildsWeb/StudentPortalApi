import express from "express";

import {
  createStudent,
  getStudent,
  loginStudent,
  updateStudent,
  deleteStudent
} from "./../Controller/studentController.js";

const router = express.Router();

router.post("/", createStudent);

router.get("/login", loginStudent);

router.get("/:id", getStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);



export default router;