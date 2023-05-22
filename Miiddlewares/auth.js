const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return res.status(401).json({message: "Authorization header missing"})
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.Jwt_Secret);
        const userId = decoded.userId;
        const user = await User.findById(user)
        if(!user) {
            return res.status(401).json({message: "Invalid Token"})
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({message: 'Invalid Token'})
    }
}

const authRole = (role) => {
    return (req, res, next) => {
        const userRole = req.body.user.role

        if(userRole !== role) {
            return res.status(401).json({message: 'Access Denied'})
        } 
    }
}

module.exports = {auth, authRole};