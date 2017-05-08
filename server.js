'use strict'

const next = require('next')
const Koa = require('koa')
const Router = require('koa-router')

const PORT = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/diaries/:id', async (ctx) => {
    const queryParams = {
      id: ctx.params.id,
    }
    await app.render(ctx.req, ctx.res, '/diary', queryParams)
    ctx.respond = false
  })

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
