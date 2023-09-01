// @desc Get goals
// @route Get /api/goals
const getGoals = (req,res) => {
    res.status(200).json({message : "Get goals"});
}

// @desc POST goal
// @route POST /api/goals
const setGoal = (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: "Create goal"})
}

// @desc UPDATE goal
// @route UPDATE /api/goals/:id
const updateGoal = (req,res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
}

// @desc DELETE goal
// @route DELETE /api/goals/:id
const deleteGoal = (req,res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}