/**
 * 拦截错误
 */
export default function errorHandle () {
  return async (ctx: any, next: any) => {
    try {
      await next()
    } catch (err) {
      console.log(err)

      ctx.status = err.statusCode || err.status || 500
      ctx.body = {
        code: 1,
        msg: err.originalError ? err.originalError.message : err.message
      }
    }
  }
}
