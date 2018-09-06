
const express = require('express');
// 导入文件模块
const fs = require('fs');
const db = require('../db');
const AdminUser = db.AdminUser;
const router = express.Router();

// 获取注册码以及响应
router.get('/admin/register/license', (req, res) => {
    // 获取文件中的注册码
    var fsLicense = new Promise(function (resolve, reject) {
        fs.readFile('license.json', (err, data) => {
            if (data != '') {
                data = JSON.parse(data);
                const fsLicenseArray = data.map((item, index, arr) => {
                    return item.id;
                })
                resolve(fsLicenseArray);
            } else {
                reject('读取文件失败，请重新获取')
            }
        })
    });
    // 获取数据库中管理员账号的注册码
    var dbLicense = new Promise(function (resolve, reject) {
        AdminUser.find((error, data) => {
            if (error) {
                return reject(err);
            }
            data = data.map((item, index, arr) => {
                return item.license;
            })
            resolve(data);
        })
    });
    var license = Promise.all([fsLicense, dbLicense]);
    license.then(function (data) {
        // console.log(data);
        var index;
        for (let i = 0; i < data[0].length; i++) {
            const fslicense = data[0][i];
            // 返回元素的索引，不存在返回-1;
            index = data[1].indexOf(fslicense);
            if (index < 0) {
                res.json({ code: 1, message: fslicense });
                return;
            }
        }
        res.json({ code: 0, message: '抱歉！注册码已注册完，如有需要请联系作者：15895952185' });
    }).catch(function (error) {
        console.log(error);
    })
});
// 处理管理员注册请求
router.post('/admin/register', (req, res) => {
    const adminUser = new AdminUser(req.body);
    // console.log(adminUser);
    var license = new Promise(function (resolve, reject) {
        AdminUser.find({ license: adminUser.license }, (error, data) => {
            if (data.length == 0) {
                resolve({ code: 2, message: '该注册码符合要求' });
            } else {
                reject({ code: 1, message: '该注册码已被注册，请重新获取' });
            }
        })
    });
    var username = new Promise(function (resolve, reject) {
        AdminUser.find({ username: adminUser.username }, (error, data) => {
            if (data.length == 0) {
                resolve({ code: 2, message: '该用户名符合要求' });
            } else {
                reject({ code: 0, message: '该用户名已被注册，请重新输入' });
            }
        })
    });
    var admin = Promise.all([license, username]);
    admin.then(function (data) {
        adminUser.save((error) => {
            if (error) {
                res.json({ code: 0, message: '数据库系统错误，请再次尝试' });
            } else {
                res.json({ code: 1, message: '注册成功，请登录！' });
            }
        })
    }).catch(function (error) {
        console.log(error);
        if (error.code == 0) {
            res.json({ code: 0, message: error.message });
        } else {
            res.json({ code: 1, message: error.message });
        }
    })
});

// 处理管理员登录页面
router.post('/admin/login', (req, res) => {
    AdminUser.find({ username: req.body.username }, (error, data) => {
        // console.log(data);
        if (data.length == 0) {
            res.json({ code: 0, message: '用户名不存在，请重新输入！' });
        } else {
            if (data[0].password == req.body.password) {
                res.json({ code: 1, message: '成功登录！' });
            } else {
                res.json({ code: 2, message: '密码错误，请重新输入！' });
            }
        }
    })
})


module.exports = router;