export function requireDirectory (webpackRequire, fileOfSameName = '') {
  return webpackRequire.keys().reduce((modules, modulePath) => {
    const [moduleName, value] = getNameAndValue(webpackRequire, modulePath, fileOfSameName)

    if (value.default) {
      modules[moduleName] = value.default
    }
    return modules
  }, {})
}

export function requireRecursiveDirectory (webpackRequire, fileOfSameName = '') {
  return webpackRequire.keys().reduce((modules, modulePath) => {
    const [moduleName, value] = getNameAndValue(webpackRequire, modulePath, fileOfSameName)

    if (value.default) {
      Object.keys(value.default).forEach(name => {
        modules[moduleName + '/' + name] = value.default[name]
      })
    }
    return modules
  }, {})
}

function getNameAndValue (webpackRequire, modulePath, fileOfSameName) {
  // set './app.js' => 'app'
  let name = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  if (fileOfSameName.length) {
    const regex = '/?' + fileOfSameName + '$'
    name = name.replace(RegExp(regex, 'g'), '')
  }
  const value = webpackRequire(modulePath)

  return [name, value]
}
