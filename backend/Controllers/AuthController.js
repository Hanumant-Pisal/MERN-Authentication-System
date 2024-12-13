const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const StudentModel = require("../Models/student");

// Signup Controller
const signup = async (req, resp) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingStudent = await StudentModel.findOne({ email });
        if (existingStudent) {
            return resp.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        // Create a new student model
        const newStudent = new StudentModel({
            username,
            email,
            password
        });

        // Hash the password before saving it
        newStudent.password = await bcrypt.hash(password, 10);

        // Save the student to the database
        await newStudent.save();

        // Send success response
        return resp.status(201).json({
            message: "Signup successfully",
            success: true
        });
    } catch (err) {
        console.error(err);  // Log the error for debugging purposes
        return resp.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Signin Controller
const signin = async (req, resp) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const student = await StudentModel.findOne({ email });
        if (!student) {
            return resp.status(404).json({
                message: 'User not found, please sign up first',
                success: false
            });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return resp.status(401).json({
                message: 'Invalid credentials',
                success: false
            });
        }


        const jwtToken = jwt.sign({
            email: student.email, _id:student._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        // Send success response
        return resp.status(200).json({
            message: 'Signin successful',
            success: true,
            jwtToken,
            email,
            username: student.username

        });
    } catch (err) {
        console.error(err);  // Log the error for debugging purposes
        return resp.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    signup,
    signin
};
