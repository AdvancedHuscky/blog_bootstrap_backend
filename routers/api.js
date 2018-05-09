const express = require('express');
const router = express.Router();
const User = require('../models/User');
//统一的返回格式
let responseData;

router.use(function (req,res,next) {
    responseData = {
        code : 0,
        message: ''
    }
    next();
})
router.post('/res/validate',(req,res)=> {
    let username = req.body.username;
    //如果数据库中存在和我们要注册的用户名同名的数据，表示该用户已经被注册了
    User.findOne({
        username
    }).then((userInfo) => {
        if (userInfo) {
            //表示数据库中有该记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册';
            res.json(responseData);
            return
        } else {
            responseData.code = 5;
            responseData.message = '用户名可以使用';
            res.json(responseData);
            return
        }
    })
})
router.post('/res',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    console.log(req.body);
    //用户名不能为空
    if(username == ""){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return
    }
    //密码不能为空
    if(password == ""){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return
    }
    //验证两次输入的密码是否一致
    if(password !== repassword){
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return
    }
    //如果数据库中存在和我们要注册的用户名同名的数据，表示该用户已经被注册了
    User.findOne({
        username
    }).then((userInfo)=>{
        if(userInfo){
            //表示数据库中有该记录
            responseData.code=4;
            responseData.message = '用户名已经被注册';
            res.json(responseData);
            return
        }
        //保存用户注册的信息到数据库中
        let user = new User({
            username,
            password
        });
        return user.save();
    }).then((newUserInfo)=>{
        console.log(newUserInfo);
        responseData.message = "注册成功";
        res.json(responseData)
    });
});
//注册逻辑
//不能为空，字符长度验证，不能重复，两次输入密码一致
//数据库查询用户名是否已经被注册
module.exports = router;