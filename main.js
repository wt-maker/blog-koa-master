const Koa = require('koa')
const verifyToken = require('./src/middleware/requestVerify')
const mongoConnect = require('./src/mongodb/index')
const bodyParser = require('koa-bodyparser')
const router = require('./src/routers')

const app = new Koa()
mongoConnect()
app.use(verifyToken)
app.use(bodyParser())
app.use(router.routes())

app.listen(3030, () => {
    console.log('the server is listen on port 3030')
})
