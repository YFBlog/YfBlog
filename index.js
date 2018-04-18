/*************1/导入模块******************** */
// express.js
// npm install express --save 安装模块
// express:基于Node的一个web应用开发框架
var express = require('express');

// 引入body-parser解析
const bodyParser = require('body-parser');
// var bodyParser = require('body-parser');
// multer中间件经常用来处理multipart/form-data类型的数据；此类型数据常用于上传文件;
const multer = require('multer');

// 下载：npm i cookie-parser --S;
// 引入cookie-parser,负责cookie的相关操作;
// const cookieParser = require('cookie-parser');

/***************2/创建应用程序***************** */
// 创建一个应用程序对象(application program)
var app = express();

/*****************4/使用中间件************* */
// 设置静态文件夹
app.use(express.static('www'));
// 设置请求体解析 两种格式
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 使用cookieParser的中间件进行cookie解析
// 参数:secret,私密，设置私钥
// app.use(cookieParser('ewuhfoelkmmasd, m sdkfn'));
// app.use(cookieParser());

// 导入路由模块，作为中间件使用
app.use(require('./routers/users'));
app.use(require('./routers/admin'));

// 创建一个配置对象，说明存储文件夹路径以及文件名
// const storage = multer.diskStorage({
//     // destination:'www/upload',
//     destination:'../yfBlogVue/src/assets',
//     filename:function (req,file,cb) {
//         console.log(file);
//         cb(null,'head.png');
//     }
// })
// 创建一个处理存储的对象
// const upload = multer({storage});
// app.post('/user/upload',upload.single('photo'),(req,res)=>{
//     console.log(req.body);
//     console.log('jkshf')
//     res.json({code:1,message:'上传成功'})
//     // res.redirect('/user/home/myhome');
// })



/****************5/接收请求并给出响应 */
//
// app.get('/',function (req,res) {
//     res.send('Hello World');
// })

/******************3/监听端口****************** */
app.listen(4000, () => {
    console.log('服务器已启动，监听4000端口...');
})