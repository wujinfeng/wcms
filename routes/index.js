var checkLogin = require('../middlewares/check').checkLogin;


//路由主入口
module.exports = function (app) {

    app.use('/', require('./frontEnd'));    //前台控制

    app.use('/admin', checkLogin, require('./backEnd/index'));    //后台控制

    // not found 404 page
    app.use(function (req, res, next) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
