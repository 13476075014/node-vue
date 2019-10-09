//这个文件是用mongolass来连接mongodb和数据库的声明

const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass(); //实例化mongolass方法
const objectTrans = require('objectid-to-timestamp') //把mongo的objectid字段可以转换成时间戳的插件
const moment = require('moment') //时间格式转换插件配合上面的插件使用

mongolass.connect(config.mongodb) //通过config插件读到config文件里面的连接地址进行连接

//添加公用的mongolass插件方法
mongolass.plugin('addCreateAt', { //添加一个自动往数据里面增加创建时间的方法
    afterFind: function(results) {
        results.forEach(item => {
            item.created_at = moment(objectTrans(item._id)).format('YYYY-MM-DD HH:mm')
        });
        return results
    },
    afterFindOne: function(result) {
        if (result) {
            result.created_at = moment(objectTrans(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result
    }

})

//1.声明表User的基本字段和索引等
//name:用户名  ； password:密码 ； avatar:头像 ；gender:性别 ；description:描述
exports.User = mongolass.model('User', {
        name: { type: 'string', required: true },
        password: { type: 'string', required: true },
        avatar: { type: 'string', require: true, default: "" },
        gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
        description: { type: 'string', required: true }
    })
    //定义索引
exports.User.index({ name: 1 }, { unique: true }).exec() //用户名全局唯一


// 2.mylog数据库的Artical表，存储的是文章的相关信息
//Artical表主要存：作者--文章标题--文章的正文--文章的点击量
exports.Artical = mongolass.model('Artical', {
    author: { type: Mongolass.Types.ObjectId, required: true },
    title: { type: 'string', required: true },
    content: { type: 'string', required: true },
    pv: { type: 'number', default: 0 }
})

//下面这一句是在创建Post表的复合索引，author升序；；_id降序；；
exports.Artical.index({ author: 1, _id: -1 }).exec() //按创建时间降序查看用户的文章列表


//3.mylog数据库的Comment表，存储评价的相关信息
//这要字段：author -- content -- postId
exports.Comment = mongolass.model('Comment', {
    author: { type: Mongolass.Types.ObjectId, required: true },
    content: { type: 'string', required: true },
    postId: { type: Mongolass.Types.ObjectId, require: true }
})
exports.Comment.index({ postId: 1, _id: 1 }).exec()