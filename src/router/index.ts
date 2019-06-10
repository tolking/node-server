import * as KoaRouter from 'koa-router'
import { verifyToken } from '../middlewares'
import user from './user'
import upload from './upload'

const router = new KoaRouter({
  prefix: '/api'
})

router
  // 验证 token 状态
  .use(verifyToken())
  .use('/user', user.routes(), user.allowedMethods())
  .use('/upload', upload.routes(), upload.allowedMethods())

export default router
