const connection = require("../configs/db.connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) res.status(401).send({message: "Email and password are required"})

    connection.query("SELECT * FROM USERS WHERE email = ?", [email], async (err, result) => {

        if(err) return res.status(500).send({message: "somthing happened"})

        if(result.length !== 1) {return res.status(401).send({message: "Incorrect email or password" });}

        const user = result[0];

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return res.status(401).send({message: "Email and password are required"})

        const {password: hashedPassword, ...userInfo} = user;

        const token = jwt.sign(userInfo, process.env.SECRET_KEY)

        return res.send({
            token,
            user: userInfo
        })
    })
}

module.exports = { login }