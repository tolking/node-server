import * as KoaRouter from 'koa-router'
import user from './user'
import upload from './upload'

const router = new KoaRouter({
  prefix: '/api'
})

router
  .use('/user', user.routes(), user.allowedMethods())
  .use('/upload', upload.routes(), upload.allowedMethods())

export default router
