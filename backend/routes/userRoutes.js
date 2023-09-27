const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateUser, deleteUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/:id', protect, updateUser)
router.delete('/:id', protect, deleteUser)

module.exports = router;
