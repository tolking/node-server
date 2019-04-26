import * as koa from 'koa'
import router from './router'
const app = new koa()

app
  .use(async (ctx: any, next: any) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    try {
      await next()
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      }
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8000)
console.log('url: http://localhost:8000')
