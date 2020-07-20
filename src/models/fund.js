const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 基金模型
const fundSchema = new Schema({
    // 基金编号
    serialNumber: {
        type: String,
        required: true
    },
    // 持仓
    position: {
        type:Number,
        default: 0
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

const Fund = mongoose.model('Fund', fundSchema)

module.exports = Fund
