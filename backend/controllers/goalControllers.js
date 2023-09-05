const asyncHandler = require("express-async-handler")
const Goal = require('../models/goalModel');
const User = require('../models/userModel')
// @desc Get goals
// @route Get /api/goals
const getGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.find({ user: req.user.id})

    res.status(200).json(goal);
})

// @desc POST goal
// @route POST /api/goals
const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc UPDATE goal
// @route UPDATE /api/goals/:id
const updateGoal = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    // Make sure the looged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }else{
        console.log("ok")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

// @desc DELETE goal
// @route DELETE /api/goals/:id
const deleteGoal = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    // Make sure the looged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await goal.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}