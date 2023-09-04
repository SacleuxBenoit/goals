// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = (req,res) => {
    res.json({message: "user register"})
}

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = (req,res) => {
    res.json({message: "user login"})
}

// @desc Get user
// @route GET /api/users/me
// @access Public
const getMe = (req,res) => {
    res.json({message: "user data display"})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}