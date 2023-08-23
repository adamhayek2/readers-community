const express = require("express")
const app = express();
const mongoDb = require("./configs/mongodb.connection")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

app.use(cors())
app.use(express.json())

const usersRoutes = require("./routes/users.route")
app.use("/users", usersRoutes)

const authRoutes = require("./routes/auth.route")
app.use("/auth", authRoutes)

const postsRoutes = require("./routes/posts.route")
app.use("/posts", postsRoutes)

app.use('/images', express.static(path.join(__dirname, 'controllers', 'images')));

app.listen(8000, (err) => {

    if(err) {
        throw err
    }

    mongoDb();

    // connection.connect((err) => {

    //     if(err) throw err
    //     console.log("db connected")

    // })

    console.log("server is running on port: ", 8000)
})