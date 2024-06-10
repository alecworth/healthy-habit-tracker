const mongoose = require('mongoose');

const HabitCompletionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    completedCount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('HabitCompletion', HabitCompletionSchema);