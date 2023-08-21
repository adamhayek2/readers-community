const connection = require("../configs/db.connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) res.status(401).send({message: "Email and password are required"})

    const user = await User.findOne({
        email: email
    })

    if(!user) res.status(404).send({message: "Incorrect Email/Password"})
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if(!isValid) res.status(404).send({message: "Incorrect Email/Password"})

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)

    return res.send({
        token,
        user,
    })

}

const register = async (req, res) => {

    const {name, email, password } = req.body;

    if(!email || !password || !name) return res.status(401).send({message: "All Fields are required"})

    const hashedPassword = await bcrypt.hash(password, 10);

    const alreadyExist = await User.find({email: email})

    if(alreadyExist.length !== 0) return res.status(401).send({message: "email already taken"})
    
    try { 
        
        const user = new User({
            ...req.body,
            password: hashedPassword
        });
        
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
    
        return res.send({
            token,
            user
            })

    }catch {

        return res.status(500).send({message: "Iternal server error, Can't register"})
    
    }
    

}
module.exports = { login, register }