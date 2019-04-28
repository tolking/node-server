import { Context } from 'koa'
import { UserModel } from '../models'

export default class UserController {
  // 查找所有
  public static async findAll(ctx: Context) {
    const includes: includes = {
      where: {
        name: 'admin'
      }
    }
    const data: any[] = await UserModel.findAll(includes)
    ctx.body = data
  }
  // 登陆
  public static async login(ctx: Context) {
    const { name, password }: userInfo = ctx.request.body
    const includes: includes = {
      where: {
        name,
        password
      }
    }
    const data: any[] = await UserModel.findAll(includes)

    console.log(data)

    if (data.length) {
      ctx.body = 'ok'
    } else {
      ctx.body = data
    }
  }
}
