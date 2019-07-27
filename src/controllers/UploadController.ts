import { Context } from 'koa'
import * as path from 'path'
import * as fs from 'fs'
import * as Busboy from 'busboy'
import * as moment from 'moment'

/**
 * 同步创建文件目录
 */
function mkdirsSync (dirname: string): boolean {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname)) ) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 */
function getSuffixName (fileName: string): string {
  const nameList: string[] = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 处理上传文件
 */
function uploadFile(ctx: Context): Promise<string> {
  const busboy = new Busboy({ headers: ctx.req.headers })
  const datePath: string = moment().format('YYYYMMDD')
  const filePath: string = path.join(__dirname, '../static/upload/' + datePath)

  mkdirsSync(filePath)

  return new Promise((resolve, reject): void => {
    // 解析请求文件事件
    busboy.on('file', (fieldname, file, filename): void => {
      const fileName: string = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      const saveTo: string = path.join(filePath, fileName)
      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))
      // 文件写入事件结束
      file.on('end', (): void => {
        const url = `${ctx.origin}/upload/${datePath}/${fileName}`
        resolve(url)
      })
    })
    // 解析错误事件
    busboy.on('error', (err: object): void => {
      reject(err)
    })
    ctx.req.pipe(busboy)
  })
}

/**
 * 上传文件
 */
export default async (ctx: Context): Promise<void> => {
  const url = await uploadFile(ctx)
  ctx.send.success(url, '上传成功')
}
