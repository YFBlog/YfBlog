
/*********1/引入模块 ******/
const express = require('express');
// const cookieParser = require('cookie-parser');
const db = require('../db');
const User = db.User;

// express().use(cookieParser('aiwhodiNHEFIhv sdLmf938nx'));
// express().use(cookieParser());

/********2/创建路由对象 ******/
// 创建路由对象
const router = express.Router();

// 注册页面用户名检测
router.get('/user/exist', (req, res) => {
    // console.log(req.query)
    User.find({ username: req.query.username }, (error, data) => {
        if (data.length == 0) {
            res.json({ code: 1, message: '用户名符合要求' });
        } else {
            res.json({ code: 0, message: '该用户名已存在' });
        }
    })
})
// 注册请求
router.post('/user/register', (req, res) => {
    console.log(req.body);
    // 创建一个User类型的对象;
    const user = new User(req.body);
    User.find((error, data) => {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].username == user.username) {
                res.json({ code: 0, message: '用户名已存在，请重新输入！' });
                return;
            }
        }
        // 将对象保存到数据库
        user.save((error) => {
            if (error) {
                res.json({ code: 0, message: '网络异常，注册不成功' });
                console.log(error + '保存数据失败')
            } else {
                res.json({ code: 1, message: '注册成功，请登录' })
                console.log('保存数据成功')
            }
        })
    })
})
// 登录请求
router.post('/user/login', (req, res) => {
    User.find({ username: req.body.username }, (error, data) => {
        if (data.length == 0) {
            res.json({ code: 0, message: '用户名不存在，请重新输入！' })
        } else {
            if (data[0].password == req.body.password) {
                // 设置cookie,记录用户状态
                // res.cookie('名字',布尔值,{expires:有效期,signed:是否签名});
                // res.cookie('isLogin', true, { expires: new Date(Date.now() + 1000 * 60), signed: true });
                // res.cookie('username',req.body.username)
                res.json({ code: 1, message: '登录成功' });
            } else {
                res.json({ code: 0, message: '密码有误，请重新输入！' });
            }
        }
    })
})
// 获取个人资料
router.get('/get_personalDate', (req, res) => {
    User.find({ username: req.query.username }, (error, data) => {
        if (error) {
            res.json({ code: 0, message: '网络异常,数据无法获取' });
        } else {
            const personalDate = {
                realname: data[0].realname,
                sex: data[0].sex == undefined ? "male" : data[0].sex,
                birthDate: data[0].birthDate,
                age: data[0].age,
                address: data[0].address,
                signature: data[0].signature,
                info: data[0].info
            }
            res.json({ code: 1, message: personalDate })
        }
    })
})
// 修改个人资料
router.post('/change_personalDate', (req, res) => {
    const personalDate = req.body.personalDate;
    User.findByIdAndUpdate(req.body.userId, {
        realname: personalDate.realname,
        sex: personalDate.sex,
        birthDate: personalDate.birthDate,
        age: personalDate.age,
        address: personalDate.address,
        signature: personalDate.signature,
        info: personalDate.info,
    }, (error) => {
        if (error) {
            res.json({ code: 0, message: '网络异常，修改失败' });
        } else {
            res.json({ code: 1, message: '修改成功' })
        }
    })
})

router.get('/user/home', (req, res) => {
    // req.cookie:随着请求发送到服务器的cookie对象
    // req.signedCookies:解密之后的cookie对象;
    // console.log(req.cookies, req.signedCookies);

})

// 处理用户的注销请求
router.get('/admin/manage-user', (req, res) => {
    User.find((error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.json({ data });
        }
    })
})
// 处理删除用户的请求
router.post('/admin/delete-user', (req, res) => {
    User.findByIdAndRemove(req.body._id, (error) => {
        if (error) {
            res.json({ code: 0, message: '数据库异常，删除失败' })
        } else {
            res.json({ code: 1, message: '删除成功' });
        }
    })
})

// 获取用户id
router.post('/getId', (req, res) => {
    User.find({ username: req.body.username }, (error, data) => {
        res.json({ id: data[0]._id });
    })
})


/*******3/导出路由模块*** */
module.exports = router;