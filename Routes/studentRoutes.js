import express from "express";

import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent
} from "./../Controller/studentController.js";

const router = express.Router();

router.post("/", createStudent);

router.get("/:id", getStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;