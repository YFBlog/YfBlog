
const express = require('express');
// const express = import('express');
const db = require('../db');
const Article = db.Article;
const router = express.Router();

router.post('/addblog', (req, res) => {
    req.body.time = (new Date()).toString().substr(15, 9) + " " + (new Date()).toLocaleDateString();
    req.body.like = [];
    req.body.pageView = 0;
    req.body.comment = 0;
    const article = new Article(req.body);
    article.save((error) => {
        if (error) {
            res.json({ code: 0, message: '网络异常，发表博客失败！' })
        } else {
            res.json({ code: 1, message: '发表成功' });
        }
    })
})

// 获取文章列表
router.get('/article-lists', (req, res) => {
    Article.find((error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json({ data });
        }
    })
})

// 点赞
router.post('/praise', (req, res) => {
    Article.findById(req.body.id, (error, data) => {
        var index = data.like.indexOf(req.body.userId)
        if (index == -1) {
            data.like.push(req.body.userId);
        } else {
            data.like.splice(index,1);
        }
        const article = new Article(data);
        article.save((error) => {
            if (error) {
                res.json({ code: 0, message: '点赞失败' });
            } else {
                res.json({ code: 1, message: article });
            }
        })
    })
})
// 删除
router.post('/deleteblog',(req,res)=>{
    // console.log(req.body);
    Article.findByIdAndRemove(req.body.id,(error)=>{
        if (error) {
            res.json({code:0,message:'数据库异常'})
        } else {
            res.json({code:1,message:'删除成功'});
        }
    })
})

module.exports = router;