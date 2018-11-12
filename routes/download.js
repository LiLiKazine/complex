const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const send = require('koa-send')

const rootPath = path.join(__dirname, '../../')

router.get('/files', async (ctx, next) => {
    let resourcesPath = path.join(rootPath, '/resource/')
    let avaliable = {
        files: []
    }
    try {
        formResource(avaliable, resourcesPath)
        ctx.body = avaliable
    } catch (e) {
        ctx.body = e
    }

})

router.get('/download/:file', async (ctx) => {
    let name = ctx.params.file
    await send(ctx, name, { root: rootPath + '/resource' })
})

let formResource = (dir, resourcesPath) => {
    try {
        let resources = fs.readdirSync(resourcesPath)
        if (resources && resources.length) {
            resources.forEach(single => {
                let resourcePath = path.join(resourcesPath, single)
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