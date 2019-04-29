import * as KoaRouter from 'koa-router'
import { UserController } from '../controllers'

const router = new KoaRouter()

router
  .post('/api/login', UserController.signIn)
  .get('/api/login/check', UserController.check)
  .post('/api/login/signUp', UserController.signUp)

export default router
