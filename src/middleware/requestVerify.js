const jwt = require('jsonwebtoken')
const { errorResponse } = require('../utils/responstHandle')
const { RESPONSE_CODE } = require('../config')
const verifyToken = async (ctx, next) => {
    let dataString = ctx.header.authorization
    try {
        if (ctx.request.url.indexOf('login') >= 0) {
            ctx.status = 200
            await next()
        } else if (dataString) {
            let dataArr = dataString.split(' ')
            let token = dataArr[1]
            let playload = await jwt.verify(token, 'wt-token')

            if (playload.username) {
                ctx.status = 200
                await next()
            }
        } else {
            errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_NO_ACCESS })
        }

    } catch (error) {
        errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_NO_ACCESS })
    }
}
module.exports = verifyToken
