import { Sequelize } from 'sequelize'

/**
 *
 * 配置数据库
 *
 * 第一个参数 boblog    数据库名字
 * 第二个参数 root      数据库账户
 * 第三个参数 password  数据库密码
 */
export default new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00'
})
