const fs = require('fs')
const path = require('path')

class Utils {

    createDir(dirPath) {
        let dirs = []
        while (!fs.existsSync(dirPath)) {
            dirs.push(dirPath)
            dirPath = path.join(dirPath, "../")
        }
        dirs.reverse()
        for (let dir in dirs) {
            fs.mkdirSync(dirs[dir])
        }
    }

    treeDir(dir, savePath) {
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
                        this.treeDir(dir[single], resourcePath)
                    }
                })
            }
        } catch (e) {
            throw e
        }
    }
}

module.exports = new Utils()
