// jwt 中储存的数据
interface VerifyData {
  username: string,
  exp: number,
  iat: number
}