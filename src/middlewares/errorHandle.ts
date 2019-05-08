import { Context } from 'koa'

/**
 * 拦截错误
 */
export default () => {
  return async (ctx: Context, next: Function) => {
    try {
      await next()
    } catch (err) {
      console.log(err)
      const status: number = err.statusCode || err.status || 500
      const msg: any = err.originalError ? err.originalError.message : err.message

      ctx.send.status(status)
      ctx.send.error(msg)
    }
  }
}
