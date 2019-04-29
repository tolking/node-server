import { Context } from 'koa'
import { UserModel } from '../models'

export default class UserController {
  // 登陆
  public static async signIn (ctx: Context) {
    const { username, password }: userInfo = ctx.request.body
    const includes: includes = {
      where: { username, password }
    }
    const data: any[] = await UserModel.findAll(includes)

    if (data.length) {
      ctx.body = {
        code: 0
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '账户或密码不正确'
      }
    }
  }
  // 检查是否有重复用户名
  public static async check (ctx: Context) {
    const { username } = ctx.request.query

    if (checkName(username)) {
      ctx.body = {
        code: 1,
        msg: '已经有相同名称'
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '名称可以注册'
      }
    }
  }
  // 注册
  public static async signUp (ctx: Context) {
    const { username, password }: userInfo = ctx.request.body
    const haveName = await checkName(username)

    if (username && password) {
      if (haveName) {
        ctx.body = {
          code: 1,
          msg: '已经有相同名称'
        }
      } else {
        const data: userInfo = { username, password }
        const id: any = await UserModel.create(data)

        if (id) {
          ctx.body = {
            code: 0,
            msg: '注册成功'
          }
        } else {
          ctx.body = {
            code: 1,
            msg: '注册失败'
          }
        }
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '账户或密码不能够为空'
      }
    }
  }
}

/**
 * 检查是否有重复用户名
 * @param username
 */
async function checkName (username: string) {
  const includes: includes = {
    where: { username }
  }
  const data: any[] = await UserModel.findAll(includes)

  return data.length
}
