const joi = require('joi');

// Signup Validation Middleware
const signupValidation = (req, resp, next) => {
    const schema = joi.object({
        username: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        // Format errors for better clarity
        const errorDetails = error.details.map(detail => detail.message);
        return resp.status(400).json({
            message: "Bad Request",
            errors: errorDetails
        });
    }

    next();
};

// Signin Validation Middleware
const signinValidation = (req, resp, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        // Format errors for better clarity
        const errorDetails = error.details.map(detail => detail.message);
        return resp.status(400).json({
            message: "Bad Request",
            errors: errorDetails
        });
    }

    next();
};

module.exports = {
    signupValidation,
    signinValidation
};
