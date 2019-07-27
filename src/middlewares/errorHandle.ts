import { Context, Middleware } from 'koa'

/**
 * 拦截错误
 */
export default (): Middleware => {
  return async (ctx: Context, next: Function): Promise<void> => {
    try {
      await next()
    } catch (err) {
      console.log(err)
      const status: number = err.statusCode || err.status || 500
      const msg: string = err.originalError ? err.originalError.message : err.message

      ctx.send.status(status)
      ctx.send.error(msg)
    }
  }
}
