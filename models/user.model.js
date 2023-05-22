const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Seller'],
        default: 'User',
    },
},
    {timestamps: true}
)

userSchema.pre('save', async function(next) {
    const user = this;

    if(!user.isModified('password')) return next()

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next();
})

userSchema.methods.comparePassword = async function(userPassword) {
    const user = this;
    return await bcrypt.compare(userPassword, user.password)
}


const User = mongoose.model('user', userSchema)

module.exports = User;