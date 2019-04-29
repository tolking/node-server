import { Sequelize } from 'sequelize'

/**
 * 启动端口
 */
export const port = 3000

/**
 * 配置数据库
 * 第一个参数  数据库名字
 * 第二个参数  数据库账户
 * 第三个参数  数据库密码
 */
export const db = new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00'
})
