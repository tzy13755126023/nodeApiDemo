var createError = require('http-errors');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var express = require('express');
var userRouter = require('./routes/user');
// 日志输出位置
var accessLogger = fs.createWriteStream('./log/access.log', { flags: 'a' })
var logger = require('morgan');
var app = express();
// const models = require("./models");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// for parsinng application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true, // 扩展模式
    limit: 4 * 1024 * 1024 //限制-4M
}));
// logs
app.use(logger('dev'));
app.use(logger({ stream: accessLogger }))

app.use(cookieParser());

// create default file
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
//处理跨域请求
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;