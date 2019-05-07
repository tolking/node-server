import { Sequelize } from 'sequelize'

/**
 * 启动端口
 */
export const port: number = 3000

/**
 * 配置数据库
 * @param username 数据库账户
 * @param password 数据库密码
 * @param database 数据库名字
 */
export const db: Sequelize = new Sequelize({
  dialect: 'mysql', // One of mysql, postgres, sqlite, mariadb and mssql
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'test',
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
 * 默认仅验证以 `/api/` 开头的路由
 * 如果需要验证所有路由将中间件 `verifyToken` 从 router 移至 index.ts 中
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
