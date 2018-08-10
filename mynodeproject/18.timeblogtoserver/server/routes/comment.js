/*这个是评论表的controller */
const express = require('express')
const router = express.Router()
const CommentModel = require('../models/comments')
const checkLogin = require('../middlewares/check').checkLogin

//#region 创建一个新的留言  用户ID：author  -- 内容： content -- 文章id：postId
router.post("/create", checkLogin, function(req, res, next) {
        var data = req.body.comment;
        CommentModel.create(data).then(function(result) {
            data = result.ops[0]
            res.send({ state: 1, msg: data })
        }).catch(function(ex) {
            data = "";
            res.send({ state: -4, msg: "后台comment,create接口错误" + ex.message });
        })
    })
    //#endregion

//#region 通过文章的id获取到所有的留言和留言作者的信息
router.post("/getComments", checkLogin, function(req, res, next) {
        var postId = req.body.postId;
        CommentModel.getComments(postId).then(function(result) {
            res.send({ state: 1, msg: result })

        }).catch(function(ex) {
            res.send({ state: -4, msg: ex.message })
        })
    })
    //#endregion


//#region 通过评价id来删除评价
router.post("/deleteById", checkLogin, function(req, res, next) {
        var Id = req.body.Id;
        CommentModel.delCommentById(Id).then(function(result) {
            res.send({ state: 1, msg: result })
        }).catch(function(ex) {
            res.send({ state: -4, msg: ex.message });
        })
    })
    //#endregion


//#region
//#endregion


//#region
//#endregion

//#region
//#endregion

module.exports = router