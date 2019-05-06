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
export const db: Sequelize = new Sequelize({
  database: 'test',
  username: 'root',
  password: '123456',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql', // One of mysql, postgres, sqlite, mariadb and mssql
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

/**
 * 静态资源目录路径
 */
export const staticPath = './static'

/**
 * token 别名
 */
export const aliasToken: string = 'token'

/**
 * 仅验证以 `/api/` 开头的路由
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
