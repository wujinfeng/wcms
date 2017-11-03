//配置日志文件
const path = require('path');
const moment = require('moment');
const mkdirp = require('mkdirp');
const winston = require('winston');
const DailyRotateFile=require('winston-daily-rotate-file');
const dateFormat=function() {
    return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};

//日志文件夹自动创建
const logDir='./logs/';
mkdirp.sync(logDir);

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
            })
        ]
    })
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
