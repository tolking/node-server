import * as KoaRouter from 'koa-router'
import { UploadController } from '../controllers'

const router = new KoaRouter()

/**
 * 上传相关路由
 */
router.post('/', UploadController)

export default router
