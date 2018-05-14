# mfresh_backend
#文件目录
config 创建config.js文件来配置数据库信息
model 存放数据模型Schema Model

#中间件
express-session session控件
connect-mongo mongoose连接工具
moment 时间控件
formidable 表单控件
swig 模版引擎
body-parser 解析post请求
cookie-parser 解析cookie主体
cookies 
ejs": "^2.5.9",
    "express": "^4.16.3",
    "express-session": "^1.15.6",
    "formidable": "^1.2.1",
    "less": "^3.0.2",
    "markdown": "^0.5.0",
    "moment": "^2.22.1",
    "mongoose": "^5.0.17",
    "morgan": "^1.9.0",
    "path": "^0.12.7",
    "swig": "^1.4.2"
#session code
req.session.code = 7;
req.session.message = "未登陆，请先登录";

