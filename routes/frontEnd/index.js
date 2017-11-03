

//前台路由主入口
module.exports = function (app) {

    app.use('/',  require('./home'));    // 首页

    app.use('/about',  require('./about'));    //关于

    app.use('/contact',  require('./contact'));    //联系

    app.use('/contact',  require('./contact'));    //联系

    // not found 404 page
    app.use(function (req, res, next) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
