const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const postsControllers = require("../controllers/posts.controller")


router.get("/", authMiddleware, postsControllers.getAllPosts)

router.post("/", authMiddleware, postsControllers.createPost)

router.get("/feed", authMiddleware, postsControllers.feed)

router.get("/search", authMiddleware, postsControllers.search)

router.get("/like/:postId", authMiddleware, postsControllers.like)


module.exports = router