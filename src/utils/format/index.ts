import { toString, isNil } from 'lodash'
import numeral from 'numeral'

export const getNumberDecimalCount = (n: number | string) => {
  const strNumber = toString(n)
  const decimalIndex = strNumber.indexOf('.')
  const decimalCount = ~decimalIndex
    ? strNumber.slice(decimalIndex + 1).length
    : 0
  return decimalCount
}

export const getRepeatZero = (count: number) => Array(count).fill(0).join('')

export const handleNumberAddComma = (n: number | string, decimals?: number) => {
  let strNumber = toString(n)
  // 传入的 number 的真实小数位数
  const rawDecimals = getNumberDecimalCount(strNumber)
  // 判断是否指定小数
  if (!isNil(decimals)) {
    // 如果真实位数和指定位数不同
    const diff = rawDecimals - decimals
    if (diff !== 0) {
      // 真实位数多于指定位数，砍去
      // 少于指定位数，补 0
      strNumber =
        diff > 0
          ? strNumber.slice(0, strNumber.length - diff)
          : `${strNumber}${getRepeatZero(-diff)}`
    }
  }
  // 经过小数位数处理后，再获取一遍最后的小数位数
  const decimalCount = getNumberDecimalCount(strNumber)
  const numberalIns = numeral(strNumber)
  return decimalCount
    ? numberalIns.format(`0,0.${getRepeatZero(decimalCount)}`)
    : numberalIns.format('0,')
}
