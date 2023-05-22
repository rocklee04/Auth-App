const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtMid = require('../middlewares/jwt');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken')

exports.signup = async (req, res) => {
    const {email, password} = req.body
    try {
        const userExists = await User.findOne({email})
        if(userExists) {
            return res.status(400).json({message: "User already exits"})
        }

        const user = new user({name, email, password, role})
        await user.save()
        return res.json({message: "User registered successfully"})
    } catch(err) {
        res.status(500).json({message: 'Error'});
    }
}
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const passMatched = await bcrypt.compare(password, user.password)
        if(!passMatched) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const token = jwt.sign({userId: user._id}, jwtMid.key, { expiresIn: jwtMid.accessExpiresIn,})
        const refreshToken = jwt.sign({userId: user._id}, jwtMid.key, { expiresIn: jwtMid.refreshExpiresIn})

        await RefreshToken.create({token : refreshToken});

        res.json({token, refreshToken})
    } catch(err) {
        res.status(500).json({message: 'Error'});
    }
}


exports.refreshToken = async(req, res) => {
    const {refreshToken} = req.body;

    try {
        const blackListed = await RefreshToken.findOne({token: refreshToken});
        if(blackListed) {
            return res.status(401).json({message: 'Invalid refresh token'})        
        }

        const decoded = jwt.verify(refreshToken, jwtMid.key);
        const token = jwt.sign({userId: decoded.userId}, jwtMid.key, {
            expiresIn: jwtMid.accessExpiresIn
        })
        res.json({token})
    } catch(err) {
        res.status(401).json({message: 'Invalid refresh token'})
    }
}


exports.logout = async (req, res) => {
    const {refreshToken} = req.body;

    try {
        await RefreshToken.create({token: refreshToken});
        res.json({message: 'Logout successfully'});
    } catch(err) {
        res.status(401).json({message: 'Error'})
    }
}