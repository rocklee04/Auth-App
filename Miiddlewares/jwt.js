const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, process.env.Jwt_Secret, {expiresIn: '1m'});
    return token;
}


const generateRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, process.env.Jwt_Secret, {expiresIn: '5m'});
    return refreshToken;
}


const verifyToken = (token, key) => {
    try{
        const decoded = jwt.verify(token, key);
        return decoded;
    } catch(err) {
        return null;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
}