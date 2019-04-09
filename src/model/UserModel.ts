const mysql = require('mysql2/promise')

import config from './config'

export class Login {
  // constructor ({ id, userName, password }: { id: number, userName: string, password: string }) {
  //   this.id = id
  //   this.userName = userName
  //   this.password = password
  // }
  public async query (userName: string) {
    const conn = await mysql.createConnection(config)
    return conn.execute('SELECT * FROM `user_list` WHERE `name` = ?', [userName]).then(([rows]: any[]) => {
      return rows[0]
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
