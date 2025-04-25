const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = function (req, res, next) {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'No token provided' });
    console.log(token)

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // assumes the token contains a user ID
        console.log(decoded)
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
