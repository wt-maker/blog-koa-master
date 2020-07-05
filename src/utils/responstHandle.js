const config = require('../config')
const { RESPONSE_CODE_OK, RESPONSE_CODE_BAD_REQUEST} = config.RESPONSE_CODE
const successResponse = ({ctx, status=RESPONSE_CODE_OK, message='请求成功', res={result:"success"}}) =>{
    ctx.status = status
    ctx.body = {
        message,
        res
    }
}
const errorResponse = ({ctx, status=RESPONSE_CODE_BAD_REQUEST, message='请求失败', error={result:"failed"}}) =>{
    ctx.status = status
    ctx.body = {
        message,
        error
    }
}

module.exports = {
    successResponse,
    errorResponse
}