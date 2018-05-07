let mongoose = require('mongoose');
let User = require('./../models/user.model');
module.exports = function (app) {
    //首页
    app.get('/',function (req,res,next) {
        res.render('page_index',{
            title:'首页',
        });
    })
    //登陆页面
    app.get('/login',(req,res,next)=>{
        res.render('page_login',{
            title:'登陆',
        })
    })
    //注册页面
    app.get('/signin',(req,res,next)=>{
        res.render('page_signin',{
            title:'注册页面'
        })
    })
    app.post('signin',(req,res)=>{
        let user = new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        });
        if(req.body['password'] != req.body['password-repeat']){
            //req.flash('error','两次输入的密码不一致');
            console.log('两次密码不一致');
            return res.redirect('/');//返回注册页
        }
        User
    })
    //文章发布
    app.get('/post',(req,res,next)=>{
        res.render('page_post',{
            title:'文章发布'
        })
    })
}