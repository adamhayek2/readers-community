const jwt = require("jsonwebtoken")

const AuthMiddleware = async (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) return res.status(401).send({message: "you are unauthorized"})

    try{

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken.userId; 
    } catch {

        return res.status(401).send({message: " you are Unauthorized"})

    }

    next();
}

module.exports = AuthMiddleware