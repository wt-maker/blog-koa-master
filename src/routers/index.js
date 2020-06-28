const Router = require('koa-router')
const article = require('./article')
const tag = require('./tag')
const fund = require('./fund')
const router = new Router()

article(router)
tag(router)
fund(router)

module.exports = router