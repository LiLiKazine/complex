const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')

global.appRoot = path.resolve(__dirname)

const index = require('./routes/index')
const users = require('./routes/users')
const download = require('./routes/download')
const syncBooks = require('./routes/lindle/sync-books')
const nutStore = require('./routes/nut-store/nut-store') 

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(download.routes(), download.allowedMethods())
app.use(syncBooks.routes(), syncBooks.allowedMethods())
app.use(nutStore.routes(), nutStore.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
