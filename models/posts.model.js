let mongoose = require('mongoose');
let config = require('../config/config');
mongoose.connect(config.mongodb);
let PostSchema = new mongoose.Schema({
    title:String,
    author:String,
    article:String,
    publishTime:String,
    postImg:String,
    comments:[{
        name:String,
        time:String,
        content:String
    }],//评论
    pv:Number //访问次数
})

//这里数据库会创建一个users集合
let Post = mongoose.model('Post',PostSchema);
module.exports = Post;