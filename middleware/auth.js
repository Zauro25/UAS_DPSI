const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
 const token = req.header('Authorization').replace('Bearer ', '');
 if (!token) {
 return res.status(401).json({ message: 'gaada token gaboleh masuk' });
 }
 try {
 const decoded = jwt.verify(token, 'tokennya_tuan');
 req.user = decoded;
 next();
 } catch (err) {
 res.status(401).json({ message: 'Tokennya ga valid sayang' });
 }
};
const authorize = (roles = []) => {
 return (req, res, next) => {
 if (!roles.includes(req.user.role)) {
 return res.status(403).json({ message: 'Forbidden' });
 }
 next();
 };
};
module.exports = { authenticate, authorize };