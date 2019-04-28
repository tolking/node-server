import db from '../config/db'
import { Model, DataTypes } from 'sequelize'

class User extends Model {
  public id!: number
  public name!: string
  public password!: string
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false
  }
}, {
  tableName: 'users',
  modelName: 'user',
  sequelize: db
})

// 创建 user 表
// User.sync({ force: true })

export default User
