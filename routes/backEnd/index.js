//后台路由主入口
module.exports = function (app) {

    app.use('/post', require('./post'));                     //文章
    app.use('/postcategory', require('./postcategory'));    //文章分类
    app.use('/gallery', require('./gallery'));              // 图片库
    app.use('/user', require('./user'));                    // 用户库



    // not found 404 page
    app.use(function (req, res, next) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
