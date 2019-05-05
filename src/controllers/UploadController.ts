import { Context } from 'koa'
import * as path from 'path'
import * as fs from 'fs'
import * as Busboy from 'busboy'

/**
 * 上传文件
 */
export default async (ctx: Context) => {
  const url = await uploadFile(ctx)
  ctx.body = {
    msg: '上传成功',
    data: { url }
  }
}

/**
 * 处理上传文件
 */
function uploadFile(ctx: Context) {
  const busboy = new Busboy({ headers: ctx.req.headers })
  const filePath = path.join(__dirname, '../static/upload')

  mkdirsSync(filePath)

  return new Promise((resolve, reject) => {
    // 解析请求文件事件
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      const _uploadFilePath = path.join(filePath, fileName)
      const saveTo = path.join(_uploadFilePath)
      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))
      // 文件写入事件结束
      file.on('end', () => {
        const url = `${ctx.origin}/static/upload/${fileName}`
        resolve(url)
      })
    })
    // 解析错误事件
    busboy.on('error', (err: any) => {
      reject(err)
    })
    ctx.req.pipe(busboy)
  })
}

/**
 * 同步创建文件目录
 */
function mkdirsSync(dirname: any) {
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
function getSuffixName(fileName: any) {
  const nameList: any = fileName.split('.')
  return nameList[nameList.length - 1]
}
