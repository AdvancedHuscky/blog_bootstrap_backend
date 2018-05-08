let mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
    //username
    username:String,
    password:String
})