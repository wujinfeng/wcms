var crypto = require('crypto');
var _ = require('lodash');
var pool = require('../lib/mysql');
var config = require('../config/config');

//md5加密
var md5 = function (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};
//加密
var encrypt = function (text) {
    return md5(md5(text));
};
// 格式2位数字
var format = function (param) {
    return (parseInt(param) < 10) ? '0' + param : param;
};

//设置左则菜单栏选中栏目
var setMenus = function (menusArr, sysname, module, subMenuName) {
    let menus = [];
    if (menusArr.length > 0) {
        menus = _.cloneDeep(menusArr);
        for (let i = 0; i < menus.length; i++) {
            let obj = menus[i];
            if (obj.sys === sysname) {
                obj.selected = true;

                for(let a = 0; a < obj.menus.length; a++){
                    //let temp = obj.menus[a];
                    if (obj.menus[a].module === module) {
                        obj.menus[a].selected = true;
                    }
                    for (let j = 0; j < obj.menus[a].menus.length; j++) {
                        //let item = temp.menus[j];
                        if (obj.menus[a].menus[j].name === subMenuName) {
                            obj.menus[a].menus[j].selected = true;
                            break;
                        }
                    }
                }

            }
            if (obj.selected) {
                break;
            }
        }
    }
    console.log('---------',menus)
    return menus;
};

//执行sql语句 param:{sql:'',option:''}
var execSql = function (db, param, cb) {
    let mysqlService = config.db[db];
    if (!mysqlService) {
        return cb(new Error('config.js没有配置数据库名与服务器对应关系'));
    }
    let poolSer = pool[mysqlService];
    if (!poolSer) {
        return cb(new Error('mysql.js没有导出连接池'));
    }
    poolSer.getConnection(function (err, connection) {
        if (err) {
            return cb(err);
        }
        if (param.option) {
            connection.query(param.sql, param.option, function (err, row) {
                connection.release();
                cb(err, row);
            });
        } else {
            connection.query(param.sql, function (err, row) {
                connection.release();
                cb(err, row);
            });
        }
    });
};

// 注意，菜单名字不能相同
var formatMenu = function (dataArr,systems) {
    var platArr = [];
    for (let m = 0; m < dataArr.length; m++){
        let platObj = dataArr[m];
        let menuArr = [];
        let menuData = platObj.menus;
        for (let i = 0; i < menuData.length; i++) {
            let obj = menuData[i];
            //检测是否已经存在此模块
            let existModule = false;
            for (let j = 0; j < menuArr.length; j++) {
                if (menuArr[j].module === obj.module) {
                    existModule = true;
                    menuArr[j].menus.push({
                        url: obj.url,
                        selected: false,
                        name: obj.name

                    });
                    break;
                }
            }
            if (!existModule) {
                menuArr.push({
                    selected: false,
                    module: obj.module,
                    icon: obj.icon,
                    menus: [{
                        url: obj.url,
                        selected: false,
                        name: obj.name

                    }]
                });
            }
        }
        var sysName;
        systems.forEach(function(system){
            if(system.platform == platObj.platform){
                sysName = system.sysName;
                if(system.sysName == 'billing'){
                    sysName = '业务中心';
                }

            }
        });
        platArr.push({
            selected: false,
            sys: sysName,
            module:[],
            icon: platObj.icon,
            menus: menuArr
        });
    }

    return platArr;
};

// 秒转时间
var second2Time = function (second) {
    let s = parseInt(second);
    let t = '00:00:00';
    if (s > 0) {
        let hour = parseInt(s / 3600);
        let min = parseInt(s / 60) % 60;
        let sec = s % 60;
        t = '' + format(hour) + ':' + format(min) + ':' + format(sec);
    }
    return t;
};

//获取公司信息
var getCompanyByCompanyId = function (companyId, companys) {
    if (companys.length > 0) {
        for (var i = 0; i < companys.length; i++) {
            if (companyId == companys[i].id) {
                return companys[i];
            }
        }
        return false;
    } else {
        return false;
    }
};
//获取公司列表去重之后的城市
var getUniqCityArr = function (companys) {
    if (companys.length > 0) {
        let res = [],
            json = {};
        for (var i = 0; i < companys.length; i++) {
            if (!json[companys[i].city]) {
                res.push({city: companys[i].city, city_code: companys[i].city_code});
                json[companys[i].city] = 1;
            }
        }
        return res;
    } else {
        return [];
    }
};
//获取公司id前几位，去后面0，用来模糊查询
var getCompanyFuzzyId = function (company_id) {
    if (company_id == '101030000') {
        company_id = '1';
    }
    return company_id + '%';
};
//判断公司状态
var judgeCompanyStatus=function (cstatus,estatus) {
    let judge_status =[];
    if(cstatus.length>0 && estatus.length>0){
        if(cstatus[0].status===1){
             judge_status.push('筹备中',1);
        }else if(cstatus[0].status===2){
            if(estatus[0].begintime > new Date()){
                 judge_status.push('筹备中',1);
            }else{
                 judge_status.push('开启中',2);
            }
        }else if(cstatus[0].status===3){
            if(estatus[0].endtime){
                if(estatus[0].endtime > new Date()){
                     judge_status.push('整顿中',3);
                }else{
                     judge_status.push('开启中',2);
                }
            }else{
                 judge_status.push('整顿中',3);
            }
        }else if(cstatus[0].status===4){
             judge_status.push('关闭中',4);
        }else{
             judge_status.push('公司状态异常',4);
        }
    }else{
         judge_status.push('筹备中',1);
    }
    return judge_status;
};

//导出
module.exports = {
    encrypt: encrypt,
    format: format,
    setMenus: setMenus,
    formatMenu: formatMenu,
    second2Time: second2Time,
    execSql: execSql,
    getCompanyByCompanyId: getCompanyByCompanyId,
    getCompanyFuzzyId: getCompanyFuzzyId,
    getUniqCityArr: getUniqCityArr,
    judgeCompanyStatus:judgeCompanyStatus
};

//菜单格式
/*
 var s =
 [
 {
 selected: false,
 module: '数据统计',
 icon: 'fa-laptop',
 menus: [
 {
 url: '/statistic/dashboard',
 selected: false,
 name: '统计概括'
 },
 {
 url: '/statistic/customer',
 selected: false,
 name: '用户统计'
 }
 ]
 },
 {
 selected: false,
 module: '数据统计',
 icon: 'fa-laptop',
 menus: [
 {
 url: '/statistic/dashboard',
 selected: false,
 name: '统计概括'
 },
 {
 url: '/statistic/customer',
 selected: false,
 name: '用户统计'
 }
 ]
 }

 ];*/
