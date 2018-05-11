let MongoClient = require('mongodb').MongoClient;
let url_test = 'mongodb://localhost:27017/Blog';//数据库不存在，连接时会自动创建
let insertData = function (db) {
    //新建一个site集合，并插入一条数据
    db.Collection('site').insertOne({username:'skng',password:'dkng',email:'ekdn@126.com'},function (err,result) {
        console.log('insert successfully');
        console.log(result);
        db.close();
        console.log('close');
    });
}
MongoClient.connect(url_test,function (err,db) {
    console.log('connected successfully to server');
    insertData(db);
});