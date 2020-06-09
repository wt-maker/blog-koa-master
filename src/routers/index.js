const Router = require('koa-router')
const article = require('./article')
const tag = require('./tag')
const router = new Router()

article(router)
tag(router)

module.exports = router