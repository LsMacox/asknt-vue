import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

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

export function installComponents (requireCtx, prefix = '') {
  requireCtx.keys().forEach(fileName => {
    if (!(/^\.?\/?(components)/).test(fileName)) {
      const componentConfig = requireCtx(fileName)
      let componentName = getOnlyComponentName(fileName, prefix)
      componentName = upperFirst(camelCase(prefix.toLowerCase() + '-' + componentName))
      Vue.component(componentName, componentConfig.default || componentConfig)
    }
  })
}

export function installComponent (requireCtx, componentName) {
  Vue.component(componentName, requireCtx)
}

function getOnlyComponentName (fileName, prefix) {
  let componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+/, '$1')),
  )

  if (prefix && prefix.length) {
    componentName = componentName.replace(prefix, '')
  }

  return componentName
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
