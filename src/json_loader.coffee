fs   = require('fs')
path = require('path')

module.exports =
class JsonLoader
  @write: (name, data) ->
    jsonPath = path.resolve(__dirname, '..', name)
    fs.writeFileSync(jsonPath, JSON.stringify(data))

  @read: (name) ->
    jsonPath = path.resolve(__dirname, '..', name)
    return {} unless fs.existsSync(jsonPath)
    return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
