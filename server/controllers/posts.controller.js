const Post = require("../models/post.model")

const getAllPosts = async (req, res) => {

    const posts = await Post.find().populate("user");
    res.send(posts)

}

const getPost = async (req, res) =>{

}

const createPost = async (req, res) => {

    const { user, book_name, author, picture, review } = req.body;

    const post = await new Post({
        user,
        book_name,
        author,
        picture,
        review
    })

    await post.save();

    res.send(post)
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
}