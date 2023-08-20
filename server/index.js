const express = require("express")
const app = express();
// const connection = require("./configs/db.connection");
const mongoDb = require("./configs/mongodb.connection")
require("dotenv").config()

app.use(express.json())

const usersRoutes = require("./routes/users.route")
app.use("/users", usersRoutes)

const authRoutes = require("./routes/auth.route")
app.use("/auth", authRoutes)

const postsRoutes = require("./routes/posts.route")
app.use("/posts", postsRoutes)

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