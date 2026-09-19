import studentModel from "../Models/StudentModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const createStudent = async (req, res) => {
  try {
    const { name, regNo, email, password } = req.body;
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const student = await studentModel.create({
      name,
      regNo,
      email,
      password: hashedPassword
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

//LOGIN USER
const loginStudent = async (req, res) => {
try {
 const { email, password } = req.body
 const student = await studentModel.findOne({ email })
if (!student) {
 return res.status(404).json({
message: "Are you sure you signed up?"
})
}
const isMatch = await bcrypt.compare(password, student.password)
if (!isMatch) {
return res.status(401).json({
 message: "Invalid credentials"
})
 }
return res.status(200).json({
message: "Student logged in successfully",
      data: student
})
 } catch (error) {
 return res.status(500).json({ message: error.message })
 }
}


const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await studentModel.findById(id);

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

    const student = await studentModel.findByIdAndUpdate(
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

    const student = await studentModel.findByIdAndDelete(id);

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
  loginStudent,
  getStudent,
  updateStudent,
  deleteStudent
};
