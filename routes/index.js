var checkLogin = require('../middlewares/check').checkLogin;


//路由主入口
module.exports = function (app) {

    app.use('/', require('./frontEnd/index'));    //前台控制


    app.use('/admin/login', checkLogin, require('./backEnd/login'));                 //首页
    app.use('/admin/post', checkLogin, require('./backEnd/post'));                   //文章
    app.use('/admin/postcategory', checkLogin, require('./backEnd/postcategory'));   //分类
    app.use('/admin/media', checkLogin, require('./backEnd/media'));                 //媒体
    app.use('/admin/user', checkLogin, require('./backEnd/user'));                   //用户


    // not found 404 page
    app.use(function (req, res, next) {
        if (!res.headersSent) {
            //res.render('404');
            throw new Error('404');
        }
    });
};
