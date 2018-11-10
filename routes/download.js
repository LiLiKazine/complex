const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const send = require('koa-send')

const rootPath = path.join(__dirname, '../../')

router.get('/files', async (ctx, next) => {
    let filePath = path.join(rootPath, '/resource/test')
    try {
        // let files = await fs.readdir(filePath)
        let files = fs.readdirSync(filePath)
        let avaliable = []
        if (files && files.length) {
            files.array.forEach(file => {
                if (fs.statSync(path.join(filePath, file)).isFile()) {
                    avaliable.push(file)
                }
            })
        }
        ctx.body = avaliable
    } catch (e) {
        ctx.body = e
    }

})

router.get('/download/:file', async (ctx) => {
    let name = ctx.params.file
    await send(ctx, name, { root: rootPath + '/resource' })
})

module.exports = router