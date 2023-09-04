const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    // Check if user exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User already exist")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid data')
    }

    res.json({message: "user register"})
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {
    res.json({message: "user login"})
})

// @desc Get user
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req,res) => {
    res.json({message: "user data display"})
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}