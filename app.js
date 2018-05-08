// 应用程序的入口文件

//创建express模块
let express = require('express');
//创建app应用=》Node.js HttpServer（）
let app = express();
//加载模板处理模块
let swig = require('swig');

//用户通过URL来访问web应用，web后端根据用户访问的url处理不同的业务逻辑

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回__dirname + '/public'
app.use('/public',express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');
//注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）一致
app.set('view engine',html);
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

app.use('/admin',require('./routers/admin'));
app.use("/api",require('./routers/api'));
app.use('/',require('./routers/main'));


//监听端口
app.listen(8081)

//用户发送http请求 》》url 》》 解析路由 》》 找到匹配的规则 》》 执行指定的绑定函数，返回对应内容至用户
// public 》》 静态 》》 直接读取指定目录下的文件，返回给用户 》》 动态 》》 处理业务逻辑，加载模板，解析模板 》》 返回数据给用户