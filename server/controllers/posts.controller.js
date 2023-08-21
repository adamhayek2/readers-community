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
      .populate('user', 'name');
    
      res.send(followingPosts)
}

const search = async (req, res) =>{
    try{
        const{query} = req.body;
        console.log(query)

        const searchResults = await Post.find({
            $or: [
                { book_name: { $regex: query, $options: 'i' } }, 
                { author: { $regex: query, $options: 'i' } },
                { review: { $regex: query, $options: 'i' } } 
            ]
        }).sort({
            book_name: { $regex: query, $options: 'i' } ? -1 : 0,
            author: { $regex: query, $options: 'i' } ? -1 : 0,
            createdAt: -1 
          })
          .populate('user', 'username');

        return res.status(200).json(searchResults );
    }catch(error){
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllPosts,
    createPost,
    feed,
    search
}