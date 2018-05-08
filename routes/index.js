let mongoose = require('mongoose');
let User = require('./../models/user.model');
module.exports = function (app) {
    //首页
    app.get('/',function (req,res,next) {
        res.render('page_index',{
            title:'首页',
            user:true
        });
    })
    //登陆页面
    app.get('/login',(req,res,next)=>{
        res.render('page_login',{
            title:'登陆',
        })
    })
    app.post('/login',(req,res)=>{
        let password = req.body.password;
        console.log(req.body);
        //检查用户是否存在
        User.findOne({'username':req.body.username},(err,user)=>{
            console.log(user);
            if(err){
                console.log('err',err);
                return res.redirect('/');
            }
            //用户不存在
            if(!user){
                console.log('error','用户不存在')
                return res.redirect('/login');
            }
            //判断密码输入是否正确
            if(user.password !== password){
                console.log('error','密码错误');
                return res.redirect('/')
            }
            //用户名密码都匹配，将用户信息存入session
            //登陆之后，session存储用户信息并且跳转到首页
            req.session.user = user;
            console.log(user.username);
            res.redirect('/');
        })
    });
    app.get('/logout',function(req,res){
        req.session.user = null;
        res.redirect('/');
    })
    //注册页面
    app.get('/signin',(req,res,next)=>{
        res.render('page_signin',{
            title:'注册页面'
        })
    })
    app.post('/signin',(req,res)=>{
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
        User.findOne({'username':user.username},(err,data)=>{
            if(err){
                req.flash('err',err);
                return res.redirect('/');
            }
            if(data != null){
                console.log('该用户已经存在');
                return res.redirect('/signin'); //返回注册页
            }else{
                //保存新用户
                user.save(function(err){
                    if(err){
                        //req.flash('err',err);
                        console.log(err);
                        return res.redirect('/');
                    }
                    //req.flash('success','注册成功!');
                    console.log('注册用户成功');
                    res.redirect('/');//注册成功后返回主页

                })
            }
        })
    })
    //文章发布
    app.get('/post',(req,res,next)=>{
        res.render('page_post',{
            title:'文章发布'
        })
    })
}