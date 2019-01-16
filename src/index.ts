import * as koa from 'koa'
import router from './router'
const app = new koa()

app
  .use(async (ctx: any, next: any) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
  })
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8000)
console.log('url: http://localhost:8000')