const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const getAllUsers = async (req, res) => {

    const users = await User.find();

    res.send(users)

}

const getUser = async (req, res) =>{
    const {id} = req.params;

    const user = await User.findById(id).select("-password");

    res.send(user)

}

const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        email,
        password: hashedPassword,
        name
    })

    await user.save();

    res.send(user)

}

const editUser = async (req, res) => {
    const {id} = req.params;

    const { name,} = req.body;

    const user = await User.findByIdAndUpdate(id, {
        $set: {name}
    }, {new: true}).select("-password");

    res.send(user)
}
 
const deleteUser = (req, res) => {
    res.send("delete user")
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser
}