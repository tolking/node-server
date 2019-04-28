import * as koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import router from './router'

const app = new koa()

app
  .use(async (ctx: any, next: any) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    try {
      await next()
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500
      ctx.body = {
        message: err.message
      }
    }
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)

console.log('url: http://localhost:3000')
