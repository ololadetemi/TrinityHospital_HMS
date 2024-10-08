//This middleware is to protect routes and ensure that only authenticated users can access routes
const jwt = require('jsonwebtoken');

require('dotenv').config();

//to protect routes

exports.authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ') [1]
    }
    if(!token) {
        return res.status(401).json({ message: 'Not Authorized. No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};


//To authorize roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied: You do not have authorization' })
        }
        next();
    };
};