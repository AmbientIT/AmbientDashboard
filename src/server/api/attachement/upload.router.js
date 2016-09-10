import multer from 'koa-router-multer'
import convert from 'koa-convert'
import fs from 'fs-promise'
import mime from 'mime'
import { env } from '../../_core'

const upload = multer({ dest: `${process.cwd()}/${env.DEV ? 'src' : 'build'}/public/` })

export default (router) => {
  router.post('/upload/attachement',
    convert(upload.single('file')),
    async ctx => {
      const { file } = ctx.req
      // todo send file to google drive
      console.log(file)
      const ext = mime.extension(file.mimetype)
      await fs.rename(file.path, `${file.path}.${ext}`)
      ctx.body = {
        url: `http://${env.HOST}:${env.PORT}/${file.filename}.${ext}`,
        name: file.filename,
        type: file.mimetype,
      }
    })
}
