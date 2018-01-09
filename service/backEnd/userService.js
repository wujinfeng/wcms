/*
/!**
 * 用户
 *!/
const UserModel = require('../../model/mongodb').UserModel;
const comm = require('../../middlewares/comm');

class User {
    constructor(o = {}) {
        this.username = o.username;
        this.password = o.password;
        this.name = o.name;
        this.email = o.email;
        this.role = o.role;
        //console.log(`User: ${this.username}, ${this.password}, ${this.name}, ${this.email}, ${this.role} `);
    }

    init() {
        this.username = this.username ? this.username.trim() : '';
        this.password = comm.encrypt('' + this.username + this.password ? this.password.trim() : '');
        this.name = this.name ? this.name.trim() : '';
        this.email = this.email ? this.email.trim() : '';
    }

    add() {
        let data = {
            username: this.username,
            password: this.password,
            name: this.name,
            email: this.email,
            role: this.role
        };
        let user = new UserModel(data, false);
        return user.save().then(function (doc) {
            return {err: null, doc: doc};
        }).catch(function (e) {
            return {err: e, doc: null};
        });
    }

    del(_id, cb) {
        UserModel.findByIdAndRemove(_id, (err) => {
            cb(err);
        });
    }

    editById(_id, cb) {
        let update = {};
        if (this.username) {
            update.username = this.username;
        }
        if (this.password) {
            update.password = this.password;
        }
        if (this.name) {
            update.name = this.name;
        }
        if (this.email) {
            update.email = this.email;
        }
        if (this.role) {
            update.role = this.role;
        }
        UserModel.updateOne({_id: _id}, {$set: update}, {upsert: true, strict: false}, function (err, doc) {
            cb(err, doc);
        });
    }

    queryAll(skip, limit, cb) {
        UserModel.find({}).skip(skip).limit(limit).exec((err, docs) => {
            cb(err, docs);
        });
    }

    queryOne(obj, cb) {
        return UserModel.findOne(obj, '', {lean: true});
    }

}

module.exports = User;*/
