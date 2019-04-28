import * as KoaRouter from 'koa-router'
import { UserController } from '../controllers'

const router = new KoaRouter()

router
  .get('/api/login/all', UserController.findAll)
  .post('/api/login', UserController.login)

export default router
