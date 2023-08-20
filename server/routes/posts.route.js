const express = require("express");
const router = express.Router()
const postsControllers = require("../controllers/posts.controller")


router.get("/", postsControllers.getAllPosts)

router.get("/:id", postsControllers.getPost)

router.post("/", postsControllers.createPost)



module.exports = router