const { getFundDataById, addFund, getAllFund, getFundData } = require('../controllers/fund')
const { successResponse, errorResponse } = require('../utils/responstHandle')
const { RESPONSE_CODE } = require('../config')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const fundRouter = (router) => {

    const ADD_FUND = async (ctx, next) => {
        let data = ctx.request.body
        try {
            let res = await addFund(data)
            successResponse({ ctx, message: '插入成功', res })
        } catch (error) {
            errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '插入失败', error })
        }
    }

    router.post('/addFund', ADD_FUND)

    const GET_FUND_BY_ID = async (ctx, next) => {
        let { id } = ctx.params
        try {
            let data = await getFundDataById(id)
            let dom = new JSDOM(data)
            let applies = dom.window.document.getElementById('gz_gszzl').innerHTML
            let res = { applies }
            successResponse({ ctx, message: '查询成功', res })
        } catch (error) {
            errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '查询失败', error })
        }
    }
    router.get('/getFund/:id', GET_FUND_BY_ID)

    const GET_ALL_FUND = async (ctx, next) => {
        try {
            let fundList = await getAllFund()

            let data = await getFundData(fundList)
            
            let res = {fundList : data}

            successResponse({ ctx, message: '查询成功', res })
        } catch (error) {
            errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '查询失败', error })
        }
    }
    router.get('/getAllFund', GET_ALL_FUND)
}

module.exports = fundRouter
