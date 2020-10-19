import mongoose from 'mongoose'
import shortid from 'shortid'

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

earlSchema.statics.findByUserId = async function (userId) {
    return await this.find({ userId });
}

earlSchema.statics.findByShortCode = async function (shortCode) {
    return await this.findOne({ shortCode });
}

earlSchema.pre('save', function (next) {
    const earl = this; 
    if (!earl.shortCode) {
        earl.shortCode = shortid.generate(); 
    }
     next(); 
}); 

const Earl = mongoose.model("Earl", earlSchema); 

export default Earl; 