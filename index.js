/*************1/导入模块******************** */
// express.js
// npm install express --save 安装模块
// express:基于Node的一个web应用开发框架
var express = require('express');

/***************2/创建应用程序***************** */
// 创建一个应用程序对象(application program)
var app = express();

/*****************4/使用中间件************* */
// 设置静态文件夹
app.use(express.static('www'));


/****************5/接收请求并给出响应 */
//
app.get('/',function (req,res) {
    res.send('Hello World');
})

/******************3/监听端口****************** */
app.listen(4000,()=>{
    console.log('服务器已启动，监听4000端口...');
})