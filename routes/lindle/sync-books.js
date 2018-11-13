const router = require('koa-router')()
const path = require('path')
const multer = require('koa-multer')
const fs = require('fs')
const send = require('koa-send')


const bookPath = path.join(appRoot, '../', '/resource/lindle/books')
const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/lindle/sync-books', (ctx, next) => {

    

})

router.get('/lindle/bookshelf', (ctx, next) => {
    var dir = []
    try {
        let books = fs.readdirSync(bookPath) 
        if (books && books.length) {
            for(let book in books) {
                let stat = fs.statSync(path.join(bookPath, books[book]))
                if (stat.isFile()){
                    dir.push(books[book])
                }
            }
        }
        ctx.body = dir
    } catch(e){
        ctx.body = e.message
    }
})

router.post('/lindle/download-book', async (ctx)=>{
    try {
        let book = ctx.request.body.book
        let url = path.join(bookPath, book)
        if (fs.existsSync(url) && fs.statSync(url).isFile()) {
            await send(ctx, book, { root: bookPath })
        } else {
            ctx.body = `${book} not exists.`
        }
    } catch(e) {
        ctx.body = e.message
    }
    

})

router.post('/lindle/upload-book', upload.single('book'), (ctx) => {

})


module.exports = router