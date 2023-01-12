



const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.userData = decoded;
        // console.log("DECODED :",decoded);
        next();
    } catch (error) {
        console.log("error", error)
        res.status(404).json({
            message: 'Authentication failed'
        })
    }


}