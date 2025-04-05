import mongoose from 'mongoose';

// Define a sample schema for a Task model
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

// Export the models
export { Task };