import * as koa from 'koa'
import { Context } from 'koa'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-bodyparser'
import * as serve from 'koa-static'
import * as path from 'path'
import router from './router'
import { port, corsConfig, staticPath } from './config'
import { common, verifyToken, errorHandle } from './middlewares'

const app = new koa()

app
// 处理浏览器跨域(默认允许所有，如果不需要注销代码)
  .use(cors({
    origin: (ctx: Context): string => {
      const origin: string = ctx.request.header.origin
      return (
        corsConfig.originList.length && !corsConfig.originList.includes(origin)
          ? corsConfig.originList[0]
          : origin
      )
    },
    allowMethods: corsConfig.allowMethods,
    maxAge: corsConfig.maxAge
  }))

// 打印请求信息
  .use(async (ctx: Context, next: Function): Promise<void> => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
  })

// 配置静态资源目录
  .use(serve(
    path.join( __dirname, staticPath)
  ))

// 配置公共方法
  .use(common())

// 验证 token 状态
  .use(verifyToken())

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
