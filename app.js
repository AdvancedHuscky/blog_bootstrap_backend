const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
//创建mongo和session会话机制
let MongoStore = require('connect-mongo')(session);
const fs = require('fs');
const routes = require('./routes/index');

const app = express();

//设置模板目录
app.set('views',path.join(__dirname,'views'));

//设置模板引擎
app.engine('.ejs',require('ejs').renderFile);
//需要下载ejs module
app.set('view engine','ejs');

//将日志信息按照日期来归档
let nowDate = new Date();
let fileName = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()+'.log';
let logStream = fs.createWriteStream(path.join(__dirname,'logs',fileName),{flags:'a'});
app.use(morgan('tiny',{stream:logStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//session 中间件
app.use(session({
    name: 'Blog',//设置cookie中保存session id 的字段名称
    secret: 'Blog',//通过设置secret来计算hash值并放在cookie中，使产生的sinedCookie防篡改
    cookie: {maxAge:6000000},//过期时间，过期后的cookie中的session id 自动删除
    store:new MongoStore({url:'mongodb://localhost/Blog'}),//将session存储到mongodb中
    resave:false,
    saveUninitialized:true
}))

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));
app.use('/edit',express.static(path.join(__dirname,'public')))
//设置路由
routes(app);

//catch 404 and forward to error handler
app.use(function (req,res,next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function (err,req,res,next) {
    //set locals,only providing error in development
    //locals是Express应用中 Application(app)对象和Response(res)对象中的属性，该属性是一个对象。该对象的主要作用是，将值传递到所渲染的模板中。
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'?err:{};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(3000,function(){
    console.log('express server listening on port:'+3000);
});



module.exports = app;
