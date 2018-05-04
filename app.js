const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

//设置模板目录
app.set('views',path.join(__dirname,'views'));

//设置模板引擎
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));

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
app.listen(app.get('post'),function(){
    console.log('express server listening on port:'+3000);
});

module.exports = app;
