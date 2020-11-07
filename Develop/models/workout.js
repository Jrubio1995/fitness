const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExcerciseSchema = new Schema({
    type: String,
    name: String,
    duration: {
        type: Number,
        min: [0, "Negative numbers not allowed"]
    },
    weight: {
        type: Number,
        min: [0, "Negative numbers not allowed"]
    },
    reps: {
        type: Number,
        min: [0, "Negative numbers not allowed"],
        validate: { validator: Number.isInteger, message: '{VALUE} not integer' }
    },
    sets: {
        type: Number,
        min: [0, "Negative numbers not allowed"],
        validate: { validator: Number.isInteger, message: '{VALUE} not integer' }
    },
    distance: {
        type: Number,
        min: [0, "Negative numbers not allowed"]
    },
});

const workoutSchema = new Schema({
    day: Date,
    exercises: [ExcerciseSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);