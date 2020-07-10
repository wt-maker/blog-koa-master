const { addUser, getUserByName } = require('../controllers/user')
const { successResponse, errorResponse } = require('../utils/responstHandle')
const { RESPONSE_CODE } = require('../config')
const crypto = require('crypto')

const userRouter = (router) => {
    const ADD_USER = async (ctx, next) => {
        let data = ctx.request.body
        try {
            let res = await addUser(data)
            successResponse({ ctx, message: '插入成功', res })
        } catch (error) {
            errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '插入失败', error })
        }
    }
    router.post('/addUser', ADD_USER)

    const GET_USER_BY_NAME = async (ctx, next) => {
        let data = ctx.request.body
        console.log(data)
        try {
            let userInfo = await getUserByName(data.username)
            if (userInfo && userInfo.password === crypto.createHash('md5').update(data.password).digest('hex')) {
                successResponse({ ctx, message: '查询成功' })
            } else {
                errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_NOT_FOUND, message: '查询失败'})
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    router.post('/getUserByName', GET_USER_BY_NAME)
}

module.exports = userRouter
