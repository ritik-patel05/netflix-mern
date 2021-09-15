require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const checkAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request."
            });
        }

        token = token.split(" ")[1];
        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request. Invalid token."
            })
        }

        req.user = { id: decodedToken.id, email: decodedToken.email, isAdmin: decodedToken.isAdmin }
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, message: error})
    }
}

module.exports = checkAuth;