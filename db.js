
/*** 1、引入数据库模块********/
const mongoose = require('mongoose');

/*** 2、连接数据库************/
// mongoose.connect('mongodb://localhost/blogdb', { useMongoClient: true });
mongoose.connect('mongodb://192.168.232.1/blogdb');

// 用js中原生的Promise替代mongoose中被废弃的promise;
mongoose.Promise = global.Promise;

const db = mongoose.connection;
/***  3、获取连接对象，监听事件 *****/
db.on('open', () => {
    console.log('打开数据库了');
});
db.on('error', (error) => {
    console.log('连接数据库失败', error);
})

/*** 4、设置数据模式(即存储的数据格式、限制条件说明) ********/

// 1、注册用户的账号、密码以及个人资料
const userSchema = mongoose.Schema({
    "username": String,
    "password": String,
    // 个人信息
    "realname": String,
    "sex": String,
    "birthDate": String,
    "age": String,
    "address": String,
    "signature": String,
    "info": String,
})
// 2、管理员的账号、密码、注册码
const adminUserSchema = mongoose.Schema({
    "license": String,
    "username": String,
    "password": String
    // "age": String,
    // "email": String
})
// 3、用户文章的作者、标题、分类、内容、时间、点赞、评论
const articleSchema = mongoose.Schema({
    "id": String,
    "author": String,
    "title": String,
    "kinds": String,
    "content": String,
    "time": String,
    "like": Array,
    "pageView": String,
    "comment": String
})

/****5、创建数据模型  ********* */
// const ClassName = mongoose.model('要存储的集合名称CollectionsName',数据模式);
// 1、
const User = mongoose.model('users', userSchema);
const AdminUser = mongoose.model('admin_users', adminUserSchema);
const Article = mongoose.model('articles', articleSchema);


/***  6、导出数据库 ********** */
module.exports = { User, AdminUser, Article };

