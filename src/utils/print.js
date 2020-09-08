/**
 * @description 打印成功信息
 * @param {string} colorText
 * @param {boolean} isRequest true | false 是否是请求，默认值true
 * @param  {...any} args 剩余参数
 */
export const printSuccess = (colorText, isRequest = true, ...args) => {
  const reqColor = 'orange'
  const respColor = 'green'
  console.log(`%c${colorText}${isRequest ? ' --> ' : ' <-- '}`, `background:#fff;color:${isRequest ? reqColor : respColor};`, ...args)
}

/**
 * @description 打印错误信息
 * @param {string} colorText
 * @param  {...any} args
 */
export const printError = (colorText, ...args) => {
  console.log(`%c${colorText}`, 'background:#000;color:pink;fontStyle;', ...args)
}
