const mongoose = require("mongoose")

const mongoDb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/readers_community")
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch(err => { 
        console.log(err)
    })
}

module.exports = mongoDb