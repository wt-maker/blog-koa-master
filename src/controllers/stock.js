const Stock = require('../models/stock')
const axios = require('axios')
const iconv = require('iconv-jschardet');

const getStockDataFromSina = async (id) => {
  let url = `http://hq.sinajs.cn/list=${id}`
  return new Promise((resolve, reject) => {
    axios.get(url, { responseType: 'arraybuffer' }).then(
      response => {
        let { data } = response
        data = iconv.decode(data, 'gbk')
        resolve(data)
      }
    )
  })
}

const getStockDataById = async (id) => {
  let data = await getStockDataFromSina(id)
  let stockStr = data.split('=')[1]
  
  // 错误的股票代码
  if (stockStr.indexOf(',') == -1) {
    return null
  }

  stockStr = stockStr.substring(1, stockStr.length - 7)
  let stockDetail = stockStr.split(',')

  // 股票名
  let name = stockDetail[0]
  // 开盘价
  let openPrice = stockDetail[1]
  // 前一交易日收盘价
  let closePrice = stockDetail[2]
  // 当前价格
  let currentPrice = stockDetail[3]
  // 今日最高价
  let highPrice = stockDetail[4]
  // 今日最低价
  let lowPrice = stockDetail[5]
  // 成交量
  let volume = Math.ceil(stockDetail[8] / 100)
  // 成交额
  let turnover = Math.ceil(stockDetail[9] / 10000)
  // 时间
  let currentTime = stockDetail[30] + ' ' + stockDetail[31]

  return {
    stockDetail: {
      id,
      name,
      openPrice,
      closePrice,
      currentPrice,
      highPrice,
      lowPrice,
      volume,
      turnover,
      currentTime
    }
  }
}

const addStock = async (data) => {
  let stockDetail = await getStockDataFromSina(data.stockNumber)
  let stockStr = stockDetail.split('=')[1]
  // 错误的股票代码
  if (stockStr.indexOf(',') == -1) {
    return null
  }

  let res = null
  if (data) {
    res = new Stock(data).save()
  }
  return res
}

const getAllStock = async () => {
  let res = null
  await Stock.find({}, (err, doc) => {
    res = doc
  })
  return res
}

const getAllStockDetail = async (arr) => {

  return await Promise.all(arr.map(async (item) => {
      return (async () => {
          let data = await getStockDataById(item.stockNumber)
          //let response = JSON.parse(data.substring(data.indexOf('{'), data.lastIndexOf('}')+1))
          return {
            ...data
          }
      })()
  }))
}

module.exports = {
  getStockDataById,
  addStock,
  getAllStock,
  getAllStockDetail
}