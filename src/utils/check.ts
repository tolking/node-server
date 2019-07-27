interface CheckValue {
  [key: string]: boolean | string | number | object | string[] | number[] | object[];
}

/**
 * 检查对象属性的值是否存在
 * 仅拦截第一个错误，返回错误信息
 * 全部正确返回 `false`
 */
export async function checkValue (value: CheckValue): Promise<string | boolean> {
  return new Promise((resolve): void => {
    for (const key in value) {
      if (!value[key]) {
        resolve(key + '的值不存在或者不合法')
        break
      }
    }
    resolve(false)
  })
}
