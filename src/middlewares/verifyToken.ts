import { aliasToken, secret, unless } from '../config'

const jwt = require ('jsonwebtoken')

/**
 * 验证 token 状态
 */
export default function verifyToken () {
  return async (ctx: any, next: any) => {
    const verify: boolean = await verifyRoute(ctx.request.url, unless)

    if (!verify) {
      // 获取 token值
      const accessToken: string = ctx.request.header[aliasToken]
        ? ctx.request.header[aliasToken]
        : ctx.cookies.get(aliasToken) || ''

      if (accessToken) {
        try {
          const { username } = await jwt.verify(accessToken, secret)
          ctx.username = username
          await next()
        } catch (error) {
          ctx.status = 403
          ctx.body = {
            code: 4,
            msg: '登陆信息已经过期'
          }
        }
      } else {
        ctx.status = 401
        ctx.body = {
          code: 3,
          msg: '没有权限访问'
        }
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
    return (<string[]>rule).includes(route)
  } else {
    return (<RegExp>rule).test(url)
  }
}
