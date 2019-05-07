import { Context } from 'koa'
import * as jwt from 'jsonwebtoken'
import { aliasToken, secret, unless } from '../config'

/**
 * 验证 token 状态
 */
export default () => {
  return async (ctx: Context, next: Function) => {
    const verify: boolean = await verifyRoute(ctx.request.url, unless)

    if (verify) {
      // 获取 token值
      const accessToken: string = ctx.request.header[aliasToken]
        ? ctx.request.header[aliasToken]
        : ctx.cookies.get(aliasToken) || ''

      if (accessToken) {
        try {
          const data: object | string = await jwt.verify(accessToken, secret)
          if (typeof <object>data === 'object') {
            ctx.token = <VerifyData>data
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

/**
 * 验证当前路由
 * @param url 当前路由
 * @param rule 排除规则
 */
async function verifyRoute (url: string, rule: string[] | RegExp) {
  if (Array.isArray(<string[]>rule)) {
    const route: string = url.split('?')[0]
    return !(<string[]>rule).includes(route)
  } else {
    return !(<RegExp>rule).test(url)
  }
}
