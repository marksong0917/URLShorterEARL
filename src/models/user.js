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
        username: {
            type: String, 
            unique: true,
        },
    },
    {
        timestamps: true,
        collection: "Users", 
    }
)

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({ username: login, })
    
    if (!user) {
        user = await this.findOne({
            email: login, 
        })
    }
    return user ? user : null;
}

const User = mongoose.model("User", userSchema); 

export default User; 