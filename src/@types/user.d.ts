// 用户信息
interface UserInfo {
  username: string;
  password: string;
}

// 修改密码
interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

// jwt 中储存的数据
interface VerifyData {
  id: number;
  username: string;
  exp: number;
  iat: number;
}