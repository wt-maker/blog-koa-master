const Fund = require('../models/fund')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const jsdom = require('jsdom')
const {JSDOM} = jsdom

const getCurrentData = async (ctx) => {
    
}

module.exports = {
    getCurrentData
}