import { Context } from 'koa'
import { Login } from '../model/UserModel'

const login = new Login

export default class UserController {
  public static async login(ctx: Context) {
    const data = await login.query('admin')
    console.log(data)
    ctx.body = data
  }
}
