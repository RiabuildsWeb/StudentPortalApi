import Student from "../Models/StudentModel.js";
import mongoose from "mongoose";

const createStudent = async (req, res) => {
  try {
    const { name, regNo, email } = req.body;

    const student = await Student.create({
      name,
      regNo,
      email
    });

    res.status(201).json({
      message: "Student created successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create student",
      error: error.message
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student fetched successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student",
      error: error.message
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { regNo } = req.body;
    const { email } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { name, regNo, email },
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student",
      error: error.message
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    message: "Invalid student ID"
  });
}

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message
    });
  }
};

export {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent
};
