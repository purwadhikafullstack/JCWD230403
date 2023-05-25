const jwt = require('jsonwebtoken');

module.exports = {
    createToken: (payload, expire = '24h') => {
        let token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {expiresIn: expire});
        return token;
    },
    readToken: (req, res, next) => {
        jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, (error, decrypt) => {
            if (error) {
                console.log("Error :", error);
                return res.status(401).send({
                    success: false,
                    message: "Authentication failed",
                    error: error,
                });
            }
            req.decrypt = decrypt;
            next();
        });
    }
};