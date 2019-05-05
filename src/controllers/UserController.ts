import { Context } from 'koa'
import * as md5 from 'md5'
import { UserModel } from '../models'
import { exp, secret } from '../config'

const jwt = require ('jsonwebtoken')

/**
 * 处理用户相关数据
 */
export default class UserController {
  // 登陆
  public static async signIn (ctx: Context) {
    const { username, password }: userInfo = ctx.request.body
    const includes: includes = {
      where: { username, password: md5(password) }
    }
    const data: UserModel[] = await UserModel.findAll(includes)

    if (data.length) {
      const token: string = await jwt.sign({ username, password }, secret, { expiresIn: exp })

      ctx.body = {
        code: 0,
        token
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
    const haveName: number = await checkName(username)

    if (haveName) {
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

    if (username && password) {
      const haveName: number = await checkName(username)

      if (haveName) {
        ctx.body = {
          code: 1,
          msg: '已经有相同名称'
        }
      } else {
        const item: userInfo = { username, password: md5(password) }
        const id: UserModel = await UserModel.create(item)

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
  // 修改密码
  public static async change (ctx: Context) {
    const id: number = ctx.params.id
    const { oldPassword, newPassword }: changePassword = ctx.request.body
    const includes: includes = {
      where: { id, password: md5(oldPassword) }
    }
    // 检查用户是否存在
    const haveItem: UserModel[] = await UserModel.findAll(includes)

    if (haveItem.length) {
      const item: { password: string } = { password: md5(newPassword) }
      const includes: includes = {
        where: { id }
      }
      const data: [number, UserModel[]] = await UserModel.update(item, includes)

      if (data.length) {
        ctx.body = {
          code: 0,
          msg: '修改成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '修改失败'
        }
      }
      ctx.body = {
        data
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '原密码输入错误'
      }
    }
  }
  // 注销用户
  public static async del (ctx: Context) {
    const id: number = ctx.params.id
    const includes: includes = {
      where: { id }
    }
    // 检查用户是否存在
    const haveItem: UserModel[] = await UserModel.findAll(includes)

    if (haveItem.length) {
      const data: number = await UserModel.destroy(includes)

      if (data) {
        ctx.body = {
          code: 0,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          code: 1,
          msg: '删除失败'
        }
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '用户不存在或者已经删除'
      }
    }
  }
}

/**
 * 检查用户名是否有存在
 * @param username
 */
async function checkName (username: string) {
  const includes: includes = {
    where: { username }
  }
  const data: any[] = await UserModel.findAll(includes)

  return data.length
}
