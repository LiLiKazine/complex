const createClient = require('webdav')

const client = createClient(
    '*',
    '*',
    '*'
)

module.exports = client