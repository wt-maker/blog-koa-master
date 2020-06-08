const Router = require('koa-router')
const article = require('./article')

const router = new Router()

article(router)

module.exports = router