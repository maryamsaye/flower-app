const express = require('express');

const router = express.Router();

const { loginUser, signupUser, getAllUsers } = require('../controllers/userControllers');



router.post('/login', loginUser);

router.post('/signup', signupUser);

router.get('/getusers', getAllUsers);

module.exports = router;