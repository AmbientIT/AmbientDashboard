export const getCurencyByLocale = locale => {
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
