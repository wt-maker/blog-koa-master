const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 文章模型
const articleSchema = new Schema({
    // 标题
    title: {
        type: String,
        required: true
    },
    // 关键字
    keywords: {
        type: String,
        required: true
    },
    // 描述
    description: {
        type: String,
        required: true
    },
    // 标签
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }],
    // 编辑内容
    editContent: {
        type: String,
        required: true
    },
    // 预览内容
    previewContent: {
        type: String,
        required: true
    },
    // 状态
    state: {
        type: Number,
        default: 1
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

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
