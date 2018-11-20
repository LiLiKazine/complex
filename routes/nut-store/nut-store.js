const nut = require('../../services/nut-store')
const router = require('koa-router')({ prefix: '/nut-store' })


router.post('/dir', async (ctx, next) => {
    try{
        let path = ctx.request.body.path
        let dir = await nut.getDir(path)
        ctx.body = dir
    }catch(e){
        ctx.body = e
    }
    
})

router.post('/file', async (ctx, next) => {
    try{
        let path = ctx.request.body.path
        let file = await nut.getFile(path)
        //TODO: Save Buffer
        ctx.body = file
    }catch(e){
        ctx.body = e
    }
})

router.post('/stat', async (ctx, next)=> {
    try{
        let path = ctx.request.body.path
        let stat = await nut.getStat(path)
        ctx.body = stat
    }catch(e){
        ctx.body = e
    }
})

router.post('/link', async (ctx, next) => {
    try{
        let path = ctx.request.body.path
        let link = await nut.getLink(path)
        ctx.body = link
    }catch(e){
        ctx.body = e
    }
})

router.post('op', async (ctx, next) => {
    try{
        let source = ctx.request.body.source
        let op = ctx.request.body.op
        let res
        switch (op) {
            case 'copy':
            let target = ctx.request.body.target
            res = nut.copy(source, target)
            break
            case 'move':
            let target = ctx.request.body.target
            res = nut.move(source, target)
            break
            case 'mkdir':
            res = nut.mkdir(target)
            break
            case 'del':
            res = nut.del(target)
            break
            default:
            res = ''
            break
        }
        ctx.body = res
    }catch(e){
        ctx.body = e
    }
})

module.exports = router