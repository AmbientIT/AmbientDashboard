export const formatHeaders = data => {
  return [...Object.keys(data[0].node)
    .filter(key => key !== 'id')
    .filter(key => key !== '_id')
    .filter(key => key !== 'cursor')
    .filter(key => key !== 'attachements')
    .map(key => {
      const format = {}
      switch (key) {
        case 'amount':
          format.currency = 'EUR'
          format.type = 'currency'
          break
        case 'date':
          format.type = 'date'
          break
        case 'owner':
          format.type = 'user'
          break
        default:
          break
      }
      return {
        label: key,
        sortable: true,
        format,
        key,
      }
    }),
    {
      label: '',
      sortable: false,
      format: {},
      key: 'action',
    },
  ]
}
