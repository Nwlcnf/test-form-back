const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

const protect = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ email: decoded.email });

        if (!admin) {
            return res.status(403).json({ message: 'Forbidden - Not an admin' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = { protect };
