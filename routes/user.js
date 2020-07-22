var express = require('express');
var router = express.Router();
const models = require("../models");
const jwt = require('jsonwebtoken');
// 密钥
const secret = 'I love cs!'

router.use((req, res, next) => {
    if (req.url != '/Auth') {
        //token可能存在post请求和get请求
        // 拿取token 数据 按照自己传递方式写
        let token = req.body.token || req.query.token || req.headers['x-token'];
        if (token) {
            // 解码 token (验证 secret 和检查有效期（exp）)
            jwt.verify(token, secret, function(error, decoded) {
                if (error) {
                    res.json({
                        code: 50401,
                        message: 'token已失效'
                    });
                    return
                } else {
                    // 如果验证通过，在req中写入解密结果
                    req.decoded = decoded;
                    next(); //继续下一步路由
                }
            });
        } else {
            // 没有拿到token 返回错误 
            return res.status(403).send({
                code: 50013,
                message: '未登录'
            });
        }
    } else {
        next()
    }
});

//登录认证
router.post("/Auth", async(req, res, next) => {
    try {
        const { username, password } = req.body
        console.log(111, username);
        console.log(222, password);
        let flag = await models.user.findAll({
            'where': {
                'name': username,
            }
        });
        if (flag) {
            let userData = await models.user.findAll({
                'where': {
                    'name': username,
                    'password': password,
                }
            });
            if (userData) {
                let token = jwt.sign({
                    username: username
                }, secret, { expiresIn: 60 * 60 * 24 }); // 授权时效24小时
                res.json({
                    code: 20000,
                    message: '验证成功',
                    token: token,
                })
            } else {
                res.send({
                    code: 10001,
                    message: '用户名或密码错误'
                })
            }
        } else {
            res.send({
                code: 40404,
                message: '用户不存在'
            })
        }
    } catch (error) {
        next(error)
    }

});
//用户注册
router.post('/register', async(req, res, next) => {
    try {
        let { email, introduction, avatar, name, tenantId, balance } = req.body;
        // 持久到数据库
        let data = await models.user.create({
            email,
            introduction,
            avatar,
            name,
            tenantId,
            balance
        })
        res.json({
            code: 20000,
            data,
            message: '注冊成功'
        })
    } catch (error) {
        next(error)
    }
});

//获取用户信息
router.get('/getUserInfo', async(req, res, next) => {
    let token = req.headers['x-token'];
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, secret, async(error, decoded) => {
        // 如果验证通过，在req中写入解密结果
        let userInfo = await models.user.findAll({
            'where': {
                'name': decoded.username,
            }
        });
        res.send({
            code: 20000,
            data: {
                userInfo: userInfo[0]
            },
        })
    });

});
module.exports = router;