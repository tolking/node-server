import * as KoaRouter from 'koa-router'
import { UserController } from '../controllers'

const router = new KoaRouter()

/**
 * 用户相关路由
 */
router
  // 注册登陆相关
  .get('/check', UserController.check)
  .post('/signUp', UserController.signUp)
  .post('/signIn', UserController.signIn)
  .put('/change/:id', UserController.change)
  .del('/del/:id', UserController.del)

export default router
