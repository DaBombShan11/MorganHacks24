const jwt = require('jsonwebtoken');

function authenticateNurse(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.nurseId = decoded.nurseId; // nvm i ended up using it!!!
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Not logged in! Go login!' });
    }
}

module.exports = { authenticateNurse };