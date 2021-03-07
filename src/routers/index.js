const Router = require('koa-router')
const article = require('./article')
const tag = require('./tag')
const fund = require('./fund')
const user = require('./user')
const stock = require('./stock')
const router = new Router()

article(router)
tag(router)
fund(router)
user(router)
stock(router)

module.exports = router