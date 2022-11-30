import _ from 'lodash'

const addAccountingFormat = (number = 0, prefix = 2, round = true): string => {
  if (number) {
    const temp = String(number).split('.')
    const rounded = `${temp[0]}.${temp[1] === undefined ? '' : temp[1].substring(0, prefix)}`

    const string = (round ? number : Number(rounded)).toFixed(prefix)
    const [integer, decimal] = string.split('.')
    const newInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return [newInteger, decimal].filter((x) => x).join('.')
  }
  if (prefix === 0) {
    return '0'
  }
  return '0.00'
}

export {
  addAccountingFormat
}
