import { db } from '../config'
import { Model, DataTypes } from 'sequelize'

class User extends Model {
  public id!: number
  public username!: string
  public password!: string
}

User.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false
  }
}, {
  tableName: 'users',
  modelName: 'user',
  sequelize: db
})

// 创建 user 表(初次建表是使用)
// User.sync({ force: true })

export default User
