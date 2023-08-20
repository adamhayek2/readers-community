const express = require("express");
const router = express.Router()
const usersControllers = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/",authMiddleware, usersControllers.getAllUsers)

router.get("/:id", usersControllers.getUser)

router.post("/", usersControllers.createUser)

router.put("/:id", usersControllers.editUser)

router.delete("/:id", usersControllers.deleteUser)

module.exports = router