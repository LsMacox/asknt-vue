/**
 * @description This method is responsile for creating the object with mirror key and values
 * and also add prefix to values if available
 * @param {Array<string>} arr Array of strings
 * @param {string} prefix prefix
 * @returns {Object} object with mirror keys generated from the array of strings
 */
export const reflectKeys = (arr = [], prefix) =>
  arr.reduce((obj, key) => {
    const value = prefix ? prefix + ' ' + key : key
    obj[key] = value

    return obj
  }, {})

/**
 *
 * @param {*} obj
 * @returns
 */
export function objToUrlParam (obj) {
  return Object.keys(obj).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
  }).join('&')
}
