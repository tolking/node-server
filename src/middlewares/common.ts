import { Context } from 'koa'
import { Send } from '../utils'

/**
 * 向 ctx 中注入公共方法
 */
export default () => {
  return async (ctx: Context, next: Function) => {
    // 配置全局返回方法
    const send = new Send(ctx)
    ctx.send = send
    await next()
  }
}
