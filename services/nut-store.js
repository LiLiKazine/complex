const client = require('../config/nut-store-webdav')

let webdav = {
    getDir: (path) => {
        return client.getDirectoryContents(path)
    },

    getFile: (path, format) => {
        return client.getFileContents(path, format)
    },

    getStat: (path) => {
        return client.stat(path)
    },

    getLink: (path) => {
        return client.getFileDownloadLink(path)
    },

    copy: (source, target) => {
        return client.copyFile(source, target)
    },

    move: (source, target) => {
        return client.moveFile(source, target)
    },

    mkdir: (path) => {
        return client.createDirectory(path)
    },

    del: (path) => {
        return client.deleteFile(path)
    },

    readStream: (path, range) => {
        return client.createReadStream(path, range)
    },

    writeStream: (path) => {
        return client.createWriteStream(path)
    }
}

module.exports = webdav