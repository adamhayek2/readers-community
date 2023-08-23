const User = require("../models/user.model")
const bcrypt = require("bcrypt")


const getUser = async (req, res) =>{
    const {id} = req.params;

    const user = await User.findById(id).select("-password");

    const userPosts = await Post.find({ user: currentUser._id })

    return res.status(200).send({user: user, posts: userPosts})

}

const editUser = async (req, res) => {
    const {id} = req.params;

    const { name,} = req.body;

    const user = await User.findByIdAndUpdate(id, {
        $set: {name}
    }, {new: true}).select("-password");

    return res.status(200).send(user)
}

const follow = async (req, res) => {
    try{
        const userid = req.user;
        const userToFollow = req.params.id;

        const currentUser = await User.findById(userid).select("-password");
        
        const userExist = await User.findById(userToFollow);
        if (!userExist) return res.status(404).send({ message: 'User not found' });
        
        if(currentUser.following.includes(userToFollow)) return res.status(400).send({ message: 'User already followed' });

        currentUser.following.push(userToFollow);
        await currentUser.save();

        return res.status(200).send({ message: 'User followed successfully' });
    }catch (error){
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const unfollow = async (req, res) => {
    try{
        const userid = req.user;
        const userToUnfollow = req.params.id;

        const currentUser = await User.findById(userid).select("-password");
        
        const userExist = await User.findById(userToUnfollow);
        if (!userExist) return res.status(404).send({ message: 'User not found' });
        
        if(!currentUser.following.includes(userToUnfollow)) return res.status(40).send({ message: 'User already unfollowed' });

        currentUser.following.pop(userToUnfollow);
        await currentUser.save();

        return res.status(200).send({ message: 'User unfollowed successfully' });
    }catch (error){
        return res.status(500).send({ message: 'Internal server error' });
    }
}
 

module.exports = {
    getUser,
    editUser,
    follow,
    unfollow
}