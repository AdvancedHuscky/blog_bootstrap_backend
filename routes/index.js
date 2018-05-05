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
}