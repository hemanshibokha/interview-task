const jwt = require('jsonwebtoken');
const adminSchema = require('../model/adminSchems');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
   if(!token){
        return res.json({
            message : "token is blank"
        })
   }
    const finletoken = token.slice(7);
    jwt.verify(finletoken, 'Hemanshi', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = decoded;
        next();
    });
};

const checkRole = (role) => {
    return (req, res, next) => {
        console.log(req.user.payload.role);
        if (req.user.payload.role === role) {
            next();
            console.log("Access");
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    };
};


module.exports = {
    verifyToken,
    checkRole
}