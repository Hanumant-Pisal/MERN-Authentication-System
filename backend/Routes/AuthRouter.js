
const {signupValidation, signinValidation} = require('../Middleware/AuthValidation');
const {signup,signin} = require('../Controllers/AuthController');





const router = require('express').Router();

router.post('/signin', signinValidation, signin);


router.post('/signup', signupValidation, signup);

module.exports = router;
