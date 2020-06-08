const mongoose = require('mongoose')
const config = require('../config')

const url = config.MONGODB.url

const connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on('error', error => {
        console.log('数据库连接失败');
    })
    
    mongoose.connection.once('open', () => {
        console.log('数据库连接成功');
    })
}

module.exports = connect


