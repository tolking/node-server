/**
 * 检查对象属性的值是否存在
 * 仅拦截第一个错误，返回错误信息
 * 全部正确返回 `false`
 */
export async function checkValue (value: any) {
  return new Promise(resolve => {
    for (const key in value) {
      const item: any = value[key]
      if (!item) {
        resolve(key + '的值不存在或者不合法')
        break
      }
    }
    resolve(false)
  })
}
