const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagSchema = new Schema({
    // 标签
    name:{
        type: String,
        required: true,
        validate: /\S+/
    },
    color:{
        type: String,
        require: true
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

const Tag = mongoose.model('Tag', tagSchema) 

module.exports = Tag