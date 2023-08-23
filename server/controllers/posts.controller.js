const Post = require("../models/post.model")
const User = require("../models/user.model")
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const getAllPosts = async (req, res) => {

    const posts = await Post.find().populate("user");
    res.send(posts)

}


const createPost = async (req, res) => {
    const userid = req.user;

    const { book_name, author, picture: base64Picture, review } = req.body;

    // Convert base64 image to image file
    let picturePath = null;
    let pictureFilename = null;
    if (base64Picture) {
        const base64Data = base64Picture.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');
        const pictureExtension = base64Picture.split(';')[0].split('/')[1];
        pictureFilename = `${Date.now()}.${pictureExtension}`;
        picturePath = path.join(__dirname, 'images', pictureFilename);

        try {
            await writeFileAsync(picturePath, imageBuffer);
        } catch (error) {
            console.error("Error saving image:", error);
            res.status(500).send("Error saving image.");
            return;
        }
    }

    const post = await new Post({
        user: userid,
        book_name,
        author,
        picture: pictureFilename,
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

        return res.status(200).send(searchResults );
    }catch(error){
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const like = async (req, res) => {
    const userId = req.user;
    const postId = req.params.postId

    const currentPost = await Post.findById(postId);
    if (!currentPost) return res.status(404).send({ message: 'Post not found' });

    if(!currentPost.likes.includes(userId)) {
        currentPost.likes.push(userId);
        await currentPost.save();
        return res.status(200).send({message: "Post liked successfully"})
    }
    currentPost.likes.pop(userId);
    await currentPost.save();
    return res.status(200).send({message: "Post disliked successfully"})

}

module.exports = {
    getAllPosts,
    createPost,
    feed,
    search,
    like
}