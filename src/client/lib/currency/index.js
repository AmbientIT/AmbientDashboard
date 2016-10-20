export const getCurrencyByLocale = locale => {
  let currency
  switch (locale) {
    case 'en_us':
      currency = 'USD'
      break
    default:
      currency = 'EUR'
      break
  }
  return currency
}

export const amountToFloat = amount => {
  const amountArray = amount.split(',')
  const amountInt = amountArray[0]
    .split(' ')[1]
    .split('.')
    .reduce((base, next) => `${base}${next}`, '')

  return parseFloat(`${amountInt}.${amountArray[1]}`)
}
