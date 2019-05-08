/**
 * 封装发送数据
 */
export default class Send {
  public ctx: any

  constructor (ctx: any) {
    this.ctx = ctx
    this.ctx.set('Content-Type', 'application/json')
  }

  /**
   * 配置返回的 status
   * @param code 状态码
   */
  public status (code: number) {
    this.ctx.status = code
  }
  /**
   * 返回数据
   * @param config 数据内容
   */
  public info (data: any) {
    this.ctx.body = JSON.stringify(data)
  }

  /**
   * 返回成功数据
   * @param data 返回数据
   * @param msg 返回消息
   */
  public success (data?: any, msg?: string) {
    this.info({ code: 0, msg, data })
  }

  /**
   * 返回警告信息
   * @param msg 返回消息
   */
  public warn (msg: any) {
    this.info({ code: 1, msg })
  }

  /**
   * 返回错误数据
   * @param msg 返回消息
   */
  public error (msg: any) {
    this.info({ code: 2, msg })
  }
}
