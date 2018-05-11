//user表的数据库操作
var mongoose = require('./MyMongoose');

//创建schema,定义一些字段和其类型及一些限定
var Schema = mongoose.Schema({
    pass: String
})