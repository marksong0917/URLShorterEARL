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
    return user 
}

userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('username'))
    {
        throw Error('YOU CANNOT CHANGE YOUR USERNAME')
        // encrpyt the password string 
    }
    next(); 
})

const User = mongoose.model("User", userSchema); 

export default User; 