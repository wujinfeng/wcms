const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config/config');
const logg = config.logger;
const cors = require('cors');
const moment = require('moment');
const comm = require('./middlewares/comm');

const routes = require('./routes/index');

const app = express();
app.set('env', config.debug ? 'development' : 'production');
app.set('port', process.env.PORT || config.port);
app.set('trust proxy', config.proxy); 		// 指定子网和 IP 地址
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//模板需要的函数 （加入时间模块，秒格式化）
app.locals.moment = moment;
app.locals.second2Time = comm.second2Time;

// 添加模板必需的变量
app.use(function (req, res, next) {
    res.locals.user = '';
    res.locals.menus = {};
    next();
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'fsgdfoo22',
    store: new MongoStore({ url: config.mongoUrl, ttl: 10 * 24 * 60 * 60})
}));

app.use(cors());

routes(app);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    logg.error(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    if(config.debug){
        res.render('error');
    }else{
        res.render('404');
    }
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(config.port, function () {
        console.log('listening on port: ' + config.port);
    });
}

module.exports = app;
