// server/controllers/taskController.js

const Task = require('../models/Task'); // Assuming you have a Task model

exports.createTask = async (req, res) => {
    // 1. Basic Server-Side Validation
    const { title, date } = req.body;
    if (!title || !date) {
        // Use a 400 status for Bad Request if data is missing
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide both a title and a date for the task.' 
        });
    }

    try {
        const newTask = new Task({ title, date, user: req.user._id }); // Link to user
        await newTask.save();
        
        // 2. Use HTTP Status 201 for Successful Resource Creation
        res.status(201).json({ 
            success: true, 
            message: 'Task created successfully!', 
            task: newTask 
        });
    } catch (error) {
        // Use a 500 status for Server Errors
        res.status(500).json({ 
            success: false, 
            message: 'Server error: Could not create task.',
            error: error.message
        });
    }
};