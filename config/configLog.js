//配置日志文件

const path = require('path');
const moment = require('moment');
const mkdirp = require('mkdirp');
const winston = require('winston');
const DailyRotateFile=require('winston-daily-rotate-file');
var mail = require('../middlewares/mail');
const dateFormat=function() {
    return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};

//日志文件夹自动创建
const logDir='./logs/';
mkdirp.sync(logDir);

// 发送邮件
var error2mail = new mail({
    name: 'resetRedis',
    host: 'smtp.163.com',
    secure: true,
    port: 465,
    user: 'wujinfeng_auto@163.com',
    pass: 'wjf123456',
    from: 'wujinfeng_auto@163.com',
    to: 'wujinfeng@1862.cn',
    subject: 'resetRedis[重置redis出错]',
    level: 'error',
    silent: false,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: false
});
// 自定义日志文件
/*winston.loggers.add('appEvent', {
    transports: [
        new DailyRotateFile({
            name: 'info-file',
            filename: path.join(logDir, 'appEvent.log'),
            level: 'info',
            timestamp: dateFormat,
            localTime: true,
            maxsize: 1024*1024*10,
            datePattern:'.yyyy-MM-dd'
        })
    ]
});*/


let config = {
     logger: new (winston.Logger)({
        transports: [
            new DailyRotateFile({
                name: 'info-file',
                filename: path.join(logDir, 'info.log'),
                level: 'info',
                timestamp: dateFormat,
                localTime: true,
                maxsize: 1024*1024*10,
                datePattern:'.yyyy-MM-dd'
            }),
            new DailyRotateFile({
                name: 'error-file',
                filename: path.join(logDir, 'error.log'),
                level: 'error',
                timestamp: dateFormat,
                localTime: true,
                maxsize: 1024*1024*10,
                datePattern:'.yyyy-MM-dd'
            }),
            error2mail
        ]
    })
    // eventLog: winston.loggers.get('appEvent')
};
//崩溃日志
winston.handleExceptions(new winston.transports.File({
    filename: path.join(logDir, 'crash.log'),
    handleExceptions: true,
    timestamp:dateFormat,
    humanReadableUnhandledException: true,
    json: false
}));

module.exports = config;
