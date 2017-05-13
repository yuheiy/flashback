import path from 'path'
import next from 'next'
import Koa from 'koa'
import Router from 'koa-router'
import pug from 'pug'
import {fetchAllDiaries} from './utils/post-api'
import {SITE_TITLE, SITE_URL} from './constants'

const PORT = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  ;[
    '/favicon.ico',
  ].forEach(file => {
    const pathToFile = path.join(__dirname, 'static', file)
    router.get(file, async (ctx) => {
      await app.serveStatic(ctx.req, ctx.res, pathToFile)
      ctx.respond = false
    })
  })

  ;[
    '/atom.xml',
    '/sitemap.xml',
  ].forEach(file => {
    const pathToFile = path.join(__dirname, 'views', file.replace(/\.xml$/, '.pug'))
    let compiler

    router.get(file, async (ctx) => {
      if (!compiler) {
        compiler = pug.compileFile(pathToFile, {
          pretty: true,
        })
      }

      const diaries = await fetchAllDiaries()
      const data = compiler({
        title: SITE_TITLE,
        url: SITE_URL,
        diaries,
      })
      ctx.res.end(data)
      ctx.respond = false
    })
  })

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
