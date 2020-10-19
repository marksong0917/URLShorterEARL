import mongoose from 'mongoose'

const earlSchema = new mongoose.Schema({
    target: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        unique: true,
        required: true,
    },
    userId: String,
},
    {
    timestamp: true, 
})