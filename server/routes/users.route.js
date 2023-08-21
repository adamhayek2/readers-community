const express = require("express");
const router = express.Router()
const usersControllers = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/:id", authMiddleware, usersControllers.getUser)

router.put("/:id", authMiddleware, usersControllers.editUser)

router.post("/follow/:id", authMiddleware, usersControllers.follow)

router.post("/unfollow/:id", authMiddleware, usersControllers.unfollow)

module.exports = router