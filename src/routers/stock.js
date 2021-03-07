const { getStockDataById, addStock } = require('../controllers/stock')
const { successResponse, errorResponse } = require('../utils/responstHandle')
const { RESPONSE_CODE } = require('../config')

const stockRouter = (router) => {
  const GET_FUND_BY_ID = async(ctx, next) => {
    let { id } = ctx.params
    try {
      let data = await getStockDataById(id)
      let res = {data: data}
      successResponse({ctx, message: '查询成功', res})
    } catch (error) {
      errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '查询失败', error })
    }
  }
  router.get('/getStock/:id', GET_FUND_BY_ID)

  const ADD_STOCK = async (ctx, next) => {
    let data = ctx.request.body
    try {
        let res = await addStock(data)
        successResponse({ ctx, message: '插入成功', res })
    } catch (error) {
        errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '插入失败', error })
    }
}

router.post('/addStock', ADD_STOCK)
}

module.exports = stockRouter