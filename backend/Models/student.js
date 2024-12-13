const mongoose = require('mongoose');

// Defining the schema for Student (user)
const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    }
});

// Create the Student model
const StudentModel = mongoose.model('information', studentSchema);

module.exports = StudentModel;
