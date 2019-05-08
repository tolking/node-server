import * as koa from 'koa'
import { Context } from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as serve from 'koa-static'
import * as path from 'path'
import router from './router'
import { port, staticPath } from './config'
import { common, errorHandle } from './middlewares'

const app = new koa()

app
  // 请求信息
  .use(async (ctx: Context, next: Function) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
  })

  // 配置静态资源目录
  .use(serve(
    path.join( __dirname, staticPath)
  ))

  // 配置公共方法
  .use(common())

  // 拦截错误
  .use(errorHandle())

  // 解析 post 请求
  .use(bodyParser())

  // 加载路由插件
  .use(router.routes())
  .use(router.allowedMethods())

  // 启动服务
  .listen(port)

console.log('url: http://localhost:' + port)
