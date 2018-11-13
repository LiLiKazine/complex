const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const send = require('koa-send')
const multer = require('koa-multer')
const utils = require('../services/Utils')

const rootPath = path.join(__dirname, '../../')
const resourcesPath = path.join(rootPath, '/resource/')

const upload = multer({
    storage: multer.memoryStorage()
  });

router.get('/files', async (ctx, next) => {
    let avaliable = {
        files: []
    }
    avaliable.files.indexOf("files")
    try {
        utils.treeDir(avaliable, resourcesPath)
        // ctx.body = avaliable
        await ctx.render('download/files', { source: avaliable })
    } catch (e) {
        await ctx.render('error', { error: e })
    }

})

router.get('/download/:file', async (ctx) => {
    let name = ctx.params.file
    await send(ctx, name, { root: rootPath + '/resource' })
})

router.post('/upload', upload.single('file'), async (ctx) => {
    try {
        let upFile = ctx.req.file
        let storeDir = path.join(resourcesPath, ctx.req.body.path)        
        utils.createDir(storeDir)
        fs.writeFileSync(path.join(storeDir, upFile.originalname), upFile.buffer)
        console.log(`store dir: ${storeDir}`)
        ctx.body = 'Upload Succeeded!'
    } catch(e) {
        ctx.body = e.message
    }
})

module.exports = router