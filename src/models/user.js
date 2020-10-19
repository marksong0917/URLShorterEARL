import mongoose from 'mongoose' 

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            required: true, 
        },
    },
    {
        timestamps: true,
        collection: "Users", 
    }
)

userSchema.statics.findByEmail = async function (email) {
    let user = await this.findOne({email})
}

const User = mongoose.model("User", userSchema); 

export default User; 