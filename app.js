// 应用程序的入口文件

//创建express模块
let express = require('express');
//创建app应用=》Node.js
let app = express();
//加载模板处理模块
let swig = require('swig');
//监听端口
app.listen(8081)
//用户通过URL来访问web应用，web后端根据用户访问的url处理不同的业务逻辑

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是

//首页
//req request对象
app.get('/',(req,res,next)=>{
    res.send('<h1>this is index</h1>')
})