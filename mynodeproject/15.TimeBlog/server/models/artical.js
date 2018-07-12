// 这个js主要是Post表的业务逻辑层
//const marked = require('marked')  //markdown的转换
const Artical = require('../lib/mongo').Artical

const CommentModel = require('./comments')

// 给 post 添加留言数 commentsCount
Artical.plugin('addCommentsCount', {
    afterFind: function(posts) {
        return Promise.all(posts.map(function(post) {
            return CommentModel.getCommentsCount(post._id).then(function(commentsCount) {
                post.commentsCount = commentsCount
                return post
            })
        }))
    },
    afterFindOne: function(post) {
        if (post) {
            return CommentModel.getCommentsCount(post._id).then(function(count) {
                post.commentsCount = count
                return post
            })
        }
        return post
    }
})




//给post添加一个方法，把其content字段从markdown转换成html
Artical.plugin('contentToHtml', {
    afterFind: function(posts) {
        return posts.map(function(post) {
            post.content = marked(post.content)
            return post
        })
    },
    afterFindOne: function(post) {
        if (post) {
            post.content = marked(post.content)
        }
        return post
    }
})


module.exports = {
    //创建一篇文章
    create: function create(post) {
        return Artical.create(post).exec()
    },

    //通过文章的Id来获取到一篇文章
    getPostById: function getPostById(postId) {
        return Artical
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' })
            .addCreateAt()
            .addCommentsCount()
            .exec()
    },
    //按创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getPosts: function getPosts(author) {
        const query = {}
        if (author) {
            query.author = author
        }
        return Artical
            .find(query)
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: -1 })
            .addCreateAt()
            .addCommentsCount()
            .exec()
    },

    // 通过文章 id 给 pv 加 1
    incPv: function incPv(postId) {
        return Artical
            .update({ _id: postId }, { $inc: { pv: 1 } })
            .exec()
    },
    // 通过文章 id 获取一篇原生文章（编辑文章）
    getRawPostById: function getRawPostById(postId) {
        return Artical
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' })
            .exec()
    },

    // 通过文章 id 更新一篇文章
    updatePostById: function updatePostById(postId, data) {
        return Artical.update({ _id: postId }, { $set: data }).exec()
    },

    // 通过文章 id 删除一篇文章
    delPostById: function delPostById(postId) {
        return Artical.deleteOne({ _id: postId }).exec()
            .exec()
            .then(function(res) {
                // 文章删除后，再删除该文章下的所有留言
                if (res.result.ok && res.result.n > 0) {
                    return CommentModel.delCommentsByPostId(postId)
                }
            })
    }
}