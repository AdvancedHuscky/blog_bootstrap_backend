let mongoose = require('mongoose');
//Schema是一个文档的数据结构，它在Mongoose是一个JSON对象。它最大的特点就是无需确定字段大小，这特别适用于需要改变对象大小的情况
let config = require('./../config/config');
mongoose.connect(config.mongodb);
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
//这里数据库会创建一个users集合
let User = mongoose.model('User',UserSchema);
module.exports = User;