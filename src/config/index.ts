import { Sequelize } from 'sequelize'

/**
 * 启动端口
 */
export const port: number = 3000

/**
 * 配置数据库
 * @param dialect 数据库 One of mysql, postgres, sqlite, mariadb and mssql
 * @param host 数据库地址
 * @param port 数据库端口
 * @param username 数据库账户
 * @param password 数据库密码
 * @param database 数据库名字
 */
export const sequelize: Sequelize = new Sequelize({
  dialect: 'mysql',
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
 * 配置 cors 跨域信息
 * @param originList 允许的跨域列表(默认允许所有)
 * @param allowMethods 允许的请求方式
 * @param maxAge 最长有效时间(s)
 */
export const corsConfig: CorsConfig = {
  originList: [],
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  maxAge: 20 * 24 * 60 * 60
}

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
 * 如果需要验证所有路由将中间件 `verifyToken` 从 router/index.ts 移至 index.ts 中
 * 配置无需验证 token 的路由(数组或正则)
 */
export const unless: string[] | RegExp = [
  '/api/user/signIn',
  '/api/user/check',
  '/api/user/signUp'
]

/**
 * token 过期时间
 */
export const exp: string = '10d'

/**
 * secretOrPrivateKey
 */
export const secret: string = 'secret'
