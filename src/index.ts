import * as koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import router from './router'
import { port } from './config'

const app = new koa()

app
  .use(async (ctx: any, next: any) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    try {
      await next()
    } catch (err) {
      // 拦截错误
      ctx.status = err.statusCode || err.status || 500
      ctx.body = {
        code: 1,
        msg: err.message
      }
    }
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)

console.log('url: http://localhost:' + port)
