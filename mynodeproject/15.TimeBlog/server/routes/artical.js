//博客的文章页的路由,也是主页首页

const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const fs = require('fs');
const ArticalModel = require('../models/Artical')
const CommentModel = require('../models/comments')
const checkLogin = require('../middlewares/check').checkLogin

//1. /posts所有用户或者特定用户的文章页面 ,不果不传参就是获取所有的文章
//eg: GET /posts?author=***
router.post('/getByAuthor', function(req, res, next) {
    const author = req.query.author
    ArticalModel.getPosts(author)
        .then(function(posts) {
            res.send({ state: 1, msg: posts });
        })
        .catch(function(ex) {
            res.status = 400;
            res.send({ state: -4, msg: "后台错误：" + ex.message })
        })
})

//#region 2. 发表一篇文章的路由，文章写好后的提交地址 eg: POST  /posts/create
router.post('/create', checkLogin, function(req, res, next) {
        const author = req.session.user._id
        const title = req.body.title
        const content = req.body.content
        let post = {
                author: author,
                title: title,
                content: content
            }
            //把数据存到Post文章表里面
        ArticalModel.create(post)
            .then(function(result) {
                post = result.ops[0]
                res.send({ state: 1, msg: "成功", id: post._id })
            })
            .catch(function(ex) {
                res.status = 400;
                res.send({ state: -1, msg: ex.message })
            })
    })
    //#endregion


//#region 3.  发表文章页,获取发表文章页  GET  /posts/create
router.get('/create', checkLogin, function(req, res, next) {
        //res.send('发表文章页')
        res.render('create')
    })
    //#endregion


//#region 4.  单独一篇文章的详情页面 POst  /posts/:postId
router.post('/getById', function(req, res, next) {
        const postId = req.body.id;
        try {
            Promise.all([
                    ArticalModel.getPostById(postId), //查到这个id的文章字段
                    CommentModel.getComments(postId), // 获取该文章所有留言
                    ArticalModel.incPv(postId)
                ])
                .then(function(result) {
                    const post = result[0]
                    const comments = result[1]
                    if (!post) {
                        res.send({ state: -1, msg: "没有该文章" });
                        return;
                    } else {
                        res.send({ state: 1, msg: "成功", data: { artical: post, comments: comments } })
                    }
                })
                .catch(function(ex) {
                    res.status = 400;
                    res.send({ state: -2, msg: "后台出错：" + ex.message })
                })
        } catch (ex) {
            res.status = 400;
            res.send({ state: -2, msg: "后台出错：" + ex.message })
        }
    })
    //#endregion

//#region   5.  更新谋篇文章页  GET /posts/:postId/edit
router.get('/:postId/edit', checkLogin, function(req, res, next) {
        //res.send('更新了文章页')
        const postId = req.params.postId
        const author = req.session.user._id

        ArticalModel.getRawPostById(postId)
            .then(function(post) {
                if (!post) {
                    throw new Error('该文章不存在')
                }
                if (author.toString() !== post.author._id.toString()) {
                    throw new Error('权限不足')
                }
                res.render('edit', {
                    post: post
                })
            })
            .catch(next)

    })
    //#endregion



//#region   6.  更新一篇文章  POST /posts/:postId/edit
router.post('/:postId/edit', checkLogin, function(req, res, next) {
        // res.send('更新了这篇文章')
        const postId = req.params.postId
        const author = req.session.user._id
        const title = req.fields.title
        const content = req.fields.content

        //校验参数
        try {
            if (!title.length) {
                throw new Error('请填写标题')
            }
            if (!content.length) {
                throw new Error('请填写内容')
            }
        } catch (e) {
            req.flash('error', e.message)
            return res.redirect('back')
        }

        //对数据库进行更新
        ArticalModel.getRawPostById(postId)
            .then(function(post) {
                if (!post) {
                    throw new Error('文章不存在')
                }
                if (post.author._id.toString() !== author.toString()) {
                    throw new Error('没有权限')
                }
                ArticalModel.updatePostById(postId, { title: title, content: content })
                    .then(function() {
                        req.flash('success', '编辑成功')
                            //成功后跳回上一页
                        res.redirect(`/posts/${postId}`)
                    })
                    .catch(next)
            })
    })
    //#endregion


//#region   7.  删除一篇文章   GET  /posts/:postId/remove
router.get('/:postId/remove', checkLogin, function(req, res, next) {
        const postId = req.params.postId
        const author = req.session.user._id

        ArticalModel.getRawPostById(postId)
            .then(function(post) {
                if (!post) {
                    throw new Error('不存在该文章')
                }
                if (post.author._id.toString() !== author.toString()) {
                    throw new Error('您没有删除这篇文章的权限')
                }

                ArticalModel.delPostById(postId)
                    .then(function() {
                        //删除成功后
                        req.flash('success', '删除文章成功')
                        res.redirect('/posts')
                    })
                    .catch(next)
            })
    })
    //#endregion



//#region  wangEditor编辑器接口 wangeditor上传图片的地址
router.post("/wangeditor/upload", function(req, res, next) {
        var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./public/images";
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
            //if(files.File){
            var oldpath = files.myFileName.path;
            var extname = files.myFileName.name;
            //新的路径由三个部分组成：时间戳、随机数、拓展名
            var newpath = "./public/images/" + extname;
            //改名
            try {
                fs.rename(oldpath, newpath, function(err) {
                    if (err) {
                        res.json({ errno: 1, data: [] });
                    };
                    var mypath = newpath.replace("./public", "http://localhost:3000");
                    req.session.makeUp_imgPath = mypath;
                    res.json({ errno: 0, data: [mypath] })
                });
            } catch (ex) {
                //fs.unlink(newpath)
                res.json({ errno: 1, data: null })
            }

        });
    })
    //#endregion

module.exports = router