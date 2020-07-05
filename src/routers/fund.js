const { getFundDataById, addFund, getAllFund, getFundData, updateFund, deleteFund } = require('../controllers/fund')
const { successResponse, errorResponse } = require('../utils/responstHandle')
const { RESPONSE_CODE } = require('../config')
const jsdom = require('jsdom')
const { update } = require('../models/fund')
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

    const UPDATE_FUND_BY_ID = async (ctx, next) => {
        let { id } = ctx.params
        let data = ctx.request.body

        if (id) {
            try {
                await updateFund(id, data)
                successResponse({ ctx, message: '更新成功' })
            } catch (error) {
                errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '更新失败', error })
            }
        } else {
            errorResponse({ ctx, message: '更新失败', error: '缺少参数id' })
        }
    }
    router.post('/updateFund/:id', UPDATE_FUND_BY_ID)

    const DELETE_FUND_BY_ID = async (ctx, next) => {
        let {id} = ctx.params
        if (id) {
            try {
                await deleteFund(id)
                successResponse({ ctx, message: '删除成功' })
            } catch (error) {
                errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '删除失败', error })
            }
        } else {
            errorResponse({ ctx, message: '删除失败', error: '缺少参数id' })
        }
    }
    router.get('/deleteFund/:id', DELETE_FUND_BY_ID)
}

module.exports = fundRouter
