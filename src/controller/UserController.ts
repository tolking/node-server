import { Context } from 'koa'

export default class UserController {
  public static async login(ctx: Context) {
    ctx.body = ctx
  }
}
