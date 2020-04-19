const path = require('path')

// Returning the filepath of the script that started the process
module.exports = path.dirname(process.mainModule.filename)