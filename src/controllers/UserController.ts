import { Context } from 'koa'
import * as md5 from 'md5'
import * as jwt from 'jsonwebtoken'
import { UserModel } from '../models'
import { exp, secret } from '../config'
import { checkValue } from '../utils'
import {
  FindOptions,
  FindOrCreateOptions,
  UpdateOptions
} from 'sequelize'

/**
 * 处理用户相关数据
 */
export default class UserController {
  // 登陆
  public static async signIn (ctx: Context) {
    const { username, password }: UserInfo = ctx.request.body
    const err = await checkValue({
      username,
      password
    })

    if (err) {
      ctx.send.warn(err)
      return
    }

    const find: FindOptions = {
      where: { username, password: md5(password) }
    }
    const data: UserModel = await UserModel.findOne(find)

    if (data) {
      const token: string = await jwt.sign({ id: data.id, username }, secret, { expiresIn: exp })
      ctx.send.success(token)
    } else {
      ctx.send.warn('账户或密码不正确')
    }
  }
  // 检查是否有重复用户名
  public static async check (ctx: Context) {
    const { username } = ctx.request.query
    const err = await checkValue({
      username
    })

    if (err) {
      ctx.send.warn(err)
      return
    }

    const haveName = await checkName(username)

    if (haveName) {
      ctx.send.warn('已经有相同名称')
    } else {
      ctx.send.success('', '名称可以注册')
    }
  }
  // 注册
  public static async signUp (ctx: Context) {
    const { username, password }: UserInfo = ctx.request.body
    const err = await checkValue({
      username,
      password
    })

    if (err) {
      ctx.send.warn(err)
      return
    }

    const find: FindOrCreateOptions = {
      where: { username },
      defaults: { password: md5(password) }
    }
    const [data, state]: [UserModel, boolean] = await UserModel.findOrCreate(find)

    if (state) {
      if (data) {
        ctx.send.success('', '注册成功')
      } else {
        ctx.send.error('注册失败')
      }
    } else {
      ctx.send.warn('已经有相同用户名')
    }
  }
  // 修改密码
  public static async change (ctx: Context) {
    const id: number = ctx.params.id
    const { oldPassword, newPassword }: ChangePassword = ctx.request.body
    const err = await checkValue({
      id,
      oldPassword,
      newPassword
    })

    if (err) {
      ctx.send.warn(err)
      return
    }

    const find: FindOptions = {
      where: { id, password: md5(oldPassword) }
    }
    // 检查用户是否存在
    const haveItem: UserModel = await UserModel.findOne(find)

    if (haveItem) {
      const item: { password: string } = { password: md5(newPassword) }
      const find: UpdateOptions = {
        where: { id }
      }
      const data: [number, UserModel[]] = await UserModel.update(item, find)

      if (data.length) {
        ctx.send.success('', '修改成功')
      } else {
        ctx.send.error('修改失败')
      }
    } else {
      ctx.send.warn('原密码输入错误')
    }
  }
  // 注销用户
  public static async del (ctx: Context) {
    const id: number = ctx.params.id
    const err = await checkValue({
      id
    })

    if (err) {
      ctx.send.warn(err)
      return
    }

    const find: FindOptions = {
      where: { id }
    }
    // 检查用户是否存在
    const haveItem: UserModel = await UserModel.findOne(find)

    if (haveItem) {
      const data: number = await UserModel.destroy(find)

      if (data) {
        ctx.send.success('', '删除成功')
      } else {
        ctx.send.error('删除失败')
      }
    } else {
      ctx.send.warn('用户不存在或者已经删除')
    }
  }
}

/**
 * 检查用户名是否有存在
 * @param username 用户名
 */
async function checkName (username: string) {
  const find: FindOptions = {
    where: { username },
    attributes: ['id']
  }
  const data: UserModel = await UserModel.findOne(find)
  return data
}
