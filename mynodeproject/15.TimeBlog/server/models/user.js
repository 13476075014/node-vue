//这个是user表的业务层对数据库的增删改查
const User = require('../lib/mongo').User

/*
create
 */

module.exports = {
    create: function(user) { //创建用户
        return User.create(user).exec()
    },
    getUserByName: function(name) {
        return User
            .findOne({ name: name })
            .addCreateAt()
            .exec()
    }
}