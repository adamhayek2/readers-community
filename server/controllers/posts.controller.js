const Post = require("../models/post.model")
const User = require("../models/user.model")

const getAllPosts = async (req, res) => {

    const posts = await Post.find().populate("user");
    res.send(posts)

}


const createPost = async (req, res) => {
    const userid = req.user;
    
    const { book_name, author, picture, review } = req.body;

    const post = await new Post({
        user: userid,
        book_name,
        author,
        picture,
        review
    })

    await post.save();

    res.send(post)
}

const feed = async (req, res) => {
    const userid = req.user;
    const currentUser = await User.findById(userid).select("-password");
    const followings = await User.find({ _id: { $in: currentUser.following } }); 

    const followingPosts = await Post.find({ user: { $in: followings } })
      .sort('-createdAt')
      .populate('user', 'name'); // Populate the user field with username only
    
      res.send(followingPosts)
}

module.exports = {
    getAllPosts,
    createPost,
    feed
}