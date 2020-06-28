const { getCurrentData } = require('../controllers/fund')
const { successResponse, errorResponse } = require('../utils/responstHandle')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const fundRouter = (router) => {
    const cheerio = require('cheerio')
    const charset = require('superagent-charset')
    const superagent = charset(require('superagent'))
    
    let res = {}

    const GET_FUND = ((ctx, next) => {
        let {id} = ctx.params
        let url = `http://fund.eastmoney.com/${id}.html?spm=search`
        superagent.get(url)
            .charset('gbk')
            .buffer(true)
            .end((err, data) => {
                let dom = new JSDOM(data.text)
                let applies = dom.window.document.getElementById('gz_gszzl').innerHTML
                res = {applies}
            })
        ctx.body = res
    })
    router.get('/getFund/:id',  GET_FUND)  
}

module.exports = fundRouter
