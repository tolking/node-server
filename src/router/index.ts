import * as KoaRouter from 'koa-router'
import { UserController } from '../controller/'
const router = new KoaRouter()

router
  .get('/api/login', UserController.login)

export default router
