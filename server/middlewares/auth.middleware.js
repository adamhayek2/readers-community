const jwt = require("jsonwebtoken")

const AuthMiddleware = (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) return res.status(401).send({message: "unauthorized"})

    try{

        jwt.verify(token, process.env.SECRET_KEY);
        
    } catch {

        return res.status(401).send({message: "unauthorized"})

    }

    next();
}

module.exports = AuthMiddleware