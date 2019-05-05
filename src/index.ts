import * as koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import router from './router'
import { errorHandle, verifyToken } from './middlewares'
import { port } from './config'

const app = new koa()

app
  // 请求信息
  .use(async (ctx: any, next: any) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
  })

  // 拦截错误
  .use(errorHandle())

  // 验证 token 状态
  .use(verifyToken())

  // 解析 post 请求
  .use(bodyParser())

  // 加载路由插件
  .use(router.routes())
  .use(router.allowedMethods())

  // 启动服务
  .listen(port)

console.log('url: http://localhost:' + port)
