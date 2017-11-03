//环境配置

let config = {
    port: 3022,                        // 程序运行的端口
    proxy: 'loopback, 127.0.0.1',        //信任的代理ip
    debug: true,                        // debug 为 true 时，用于本地调试，具体错误展示
    mongoUrl: 'mongodb://219.142.131.131:27321/wutest',
    mysqlService1: {
        host: '192.168.1.252',
        user: 'zxbike',
        port: 8066,
        password: 'Zxbike#2017.com',
        database: ''
    },
    redis: {
        host: '192.168.1.21',
        db: 5,
        port: 6379,
        passwd: '123'
    },
    logger: require('./configLog').logger
};

module.exports = config;
