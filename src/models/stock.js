const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = mongoose.Schema({
  stockNumber: {
    type: String,
    required: true
  },
  create_dt: {
    type: Date,
    default: Date.now
  },
  update_dt: {
    type: Date,
    default: Date.now
  }
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock