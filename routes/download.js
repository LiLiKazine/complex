const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const send = require('koa-send')
const multer = require('koa-multer')

const rootPath = path.join(__dirname, '../../')
const resourcesPath = path.join(rootPath, '/resource/')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let request =req
        let body = req.body
        cb(null, '/tmp/my-uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

const upload = multer({
    storage: multer.memoryStorage()
  });

router.get('/files', async (ctx, next) => {
    let avaliable = {
        files: []
    }
    avaliable.files.indexOf("files")
    try {
        formResource(avaliable, resourcesPath)
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
        createDir(storeDir)
        fs.writeFileSync(path.join(storeDir, upFile.originalname), upFile.buffer)
        console.log(`store dir: ${storeDir}`)
        ctx.body = 'Upload Succeeded!'
    } catch(e) {
        ctx.body = e.message
    }
    
})

let createDir = (dirPath) => {
    let dirs = []
    while (!fs.existsSync(dirPath)) {
        dirs.push(dirPath)
        dirPath = path.join(dirPath, "../")
    }
    dirs.reverse()
    for (dir in dirs) {
        fs.mkdirSync(dirs[dir])
    }
}

let formResource = (dir, savePath) => {
    try {
        let resources = fs.readdirSync(savePath)
        if (resources && resources.length) {
            resources.forEach(single => {
                let resourcePath = path.join(savePath, single)
                let stat = fs.statSync(resourcePath)
                if (stat.isFile()) {
                    dir.files.push(single)
                } else {
                    dir[single] = {
                        files: []
                    }
                    formResource(dir[single], resourcePath)
                }
            })
        }
    } catch (e) {
        throw e
    }

}

module.exports = router