import { Context, Middleware } from 'koa'
import * as jwt from 'jsonwebtoken'
import { aliasToken, secret, unless } from '../config'

/**
 * 验证当前路由
 * @param url 当前路由
 * @param rule 排除规则
 */
async function verifyRoute (url: string, rule: string[] | RegExp): Promise<boolean> {
  if (Array.isArray(rule as string[])) {
    const route: string = url.split('?')[0]
    return !(rule as string[]).includes(route)
  } else {
    return !(rule as RegExp).test(url)
  }
}

/**
 * 验证 token 状态
 */
export default (): Middleware => {
  return async (ctx: Context, next: Function): Promise<void> => {
    const verify: boolean = await verifyRoute(ctx.request.url, unless)

    if (verify) {
      // 获取 token值
      const accessToken: string = ctx.request.header[aliasToken]
        ? ctx.request.header[aliasToken]
        : ctx.cookies.get(aliasToken) || ''

      if (accessToken) {
        try {
          const data: object | string = await jwt.verify(accessToken, secret)
          if (typeof (data as object) === 'object') {
            // eslint-disable-next-line require-atomic-updates
            ctx.token = data
          }
          await next()
        } catch (error) {
          ctx.send.warn('登陆信息已经过期')
        }
      } else {
        ctx.send.warn('没有权限访问')
      }
    } else {
      await next()
    }
  }
}
