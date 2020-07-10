const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    // 用户名
    username: {
        type: String,
        required: true
    },
    // 密码
    password: {
        type: String,
        required: true
    },
    // 密码变更时间
    password_change_dt: {
        type:Date,
        default:Date.now
    },
    // 创建时间
    create_dt: {
        type: Date,
        default: Date.now
    },
    // 更新时间
    update_dt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
