const client = require('../../config/nut-store-webdav')

client.getDirectoryContents('/').then((content) => {
    console.log(content)
})