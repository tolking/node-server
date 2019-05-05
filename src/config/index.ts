import { Sequelize } from 'sequelize'

/**
 * 启动端口
 */
export const port: number = 3000

/**
 * 配置数据库
 * 数据库名字
 * 数据库账户
 * 数据库密码
 */
export const db: Sequelize = new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00'
})

/**
 * token 别名
 */
export const aliasToken: string = 'token'

/**
 * 无需验证 token 的路由(数组或正则)
 */
export const unless: string[] | RegExp = [
  '/api/user/signIn',
  '/api/user/check',
  '/api/user/signUp',
  '/api/upload'
]

/**
 * token 过期时间
 */
export const exp: string = '10d'

/**
 * secretOrPrivateKey
 */
export const secret: string = 'secret'
