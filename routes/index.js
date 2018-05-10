let mongoose = require('mongoose');
let User = require('./../models/user.model');
let Post = require('../models/posts.model');
const moment = require('moment'); //时间控件
const session = require('express-session');
const formidable = require('formidable'); //表单控件
const path = require('path');

//检测是否登陆
function checkLogin(req,res,next){
    if(!req.session.user){
        console.log('err','未登陆，请先登陆')
        req.session.message = "未登陆，请先登录";
        return res.redirect('/login');
    }
    console.log(req.session);
    next();
}
function checkNoLogin(req,res,next){
    if(req.session.user){
        console.log('error','已登陆，无需再登陆');
        return res.redirect('back');
    }
    next();
}
//清除code
function clearCode(req,res,next){
    req.session.code = null;
    next();
}
module.exports = function (app) {
    //首页
    app.get('/',function (req,res,next) {
        Post.find({},(err,data)=>{
            if(err){
                //req.flash('err','查找错误');
                return res.redirec('/');
            }
            res.render('page_index',{
                title:'首页',
                user:req.session.user,
                //success:req.flash('success').toString(),
                //error:req.flash('err').toString(),
                posts:data,
                time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            });
        })
    });
    //登陆页面
    app.get('/login',(req,res,next)=>{
        res.render('page_login',{
            title:'登陆',
            user:req.session.user,
            message:req.session.message
        })
        console.log(req.session);
    })
    app.post('/login',clearCode,(req,res)=>{
        let password = req.body.password;
        console.log(req.body);
        //检查用户是否存在
        User.findOne({'username':req.body.username},(err,user)=>{
            console.log(user+"53");
            console.log(req.session);
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
            //console.log(user.username+"71");
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
        if(req.body['password'] !== req.body['password-repeat']){
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
    app.get('/post',checkLogin,(req,res,next)=>{
        res.render('page_post',{
            title:'文章发布',
            user: req.session.user,
        })
    });
    app.post('/post',(req,res,next)=>{
        let imgPath = path.dirname(__dirname) + '/public/images/pic';
        let form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = imgPath; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFileSize = 2*1024*1024; //文件大小
        form.type = true;
        form.parse(req,(err,fields,files)=>{
            if(err){
                console.log(err);
                return
            }
            let file = files.postImg; //获取上传文件信息

            if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/jpg'){
              console.log('上传文件格式错误，请上传图片文件');
              return res.redirect('/upload')
            }
            let title = fields.title;
            let author = req.session.user.username;
            let article = fields.article;
            let postImg = file.path.split(path.sep).pop();
            let pv = fields.pv;
            //检验参数
            try {
                if (!title.length) {
                    throw new Error('请填写标题');
                }
                if (!article.length){
                    throw new Error('请填写内容');
                }
            }catch(e){
                console.warn('error',e.message);
                return res.redirect('back');
            }
            let post = new Post({
                title,
                author,
                article,
                postImg,
                publishTime:moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString(),
                pv
            });
            post.save((err)=>{
                if(err){
                    console.log('文章发表出现错误');
                    req.flash('err','文章发表错误');
                    return res.redirect('/post');
                }
                console.log('文章录入成功');
                console.info('success','文章录入成功');
                res.redirect('/')
            })
        })
    });
    app.get('/detail',(req,res)=>{
        Post.find({},(err,data)=>{
            console.log(err);
            console.log(data);
            if(err){
                throw new Error(err);
            };
            res.render('detail',{
                title:'详情页',
                user:req.session.user,
                //success:req.flash('success').toString(),
                //error:req.flash('err').toString(),
                posts:data,
                time:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            })
        })

    })
}