import * as KoaRouter from 'koa-router'
import { verifyToken } from '../middlewares'
import {
  UserController,
  UploadController
} from '../controllers'

const router = new KoaRouter({
  prefix: '/api/'
})

router
  // 验证 token 状态
  .use(verifyToken())

  // 用户相关
  .post('user/signIn', UserController.signIn)
  .get('user/check', UserController.check)
  .post('user/signUp', UserController.signUp)
  .put('user/change/:id', UserController.change)
  .del('user/del/:id', UserController.del)

  // 上传相关
  .post('upload', UploadController)

export default router
