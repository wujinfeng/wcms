var config = require('../config/config');
var logger = config.logger;
var mysql = require('mysql');
var mysqlService1 = mysql.createPool({
    host: config.mysqlService1.host,
    user: config.mysqlService1.user,
    password: config.mysqlService1.password,
    port:config.mysqlService1.port
    //database: config.mysql.database
});
//尝试连接是否成功
mysqlService1.getConnection(function (err, connection) {
    if (err) {
        console.log('connect mysql err');
        console.log(err);
        logger.log(err);
        //process.exit(1);
        return;
    }
    console.log('connect mysql ok.');
    connection.release();
});
module.exports = {
    'mysqlService1':mysqlService1
};
