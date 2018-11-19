const createClient = require('webdav')

const client = createClient(
    'https://dav.jianguoyun.com/dav/',
    'lilikazine@gmail.com',
    'ar83ejzu72munzn9'
)

module.exports = client