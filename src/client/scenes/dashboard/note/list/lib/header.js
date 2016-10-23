import { getCurrencyByLocale } from '../../../../../lib/currency'

export default locale => [
  {
    label: 'name',
    key: 'name',
    format: {},
    sortable: true,
  },
  {
    label: 'date',
    key: 'date',
    format: {
      type: 'date',
    },
    sortable: true,
  },
  {
    label: 'owner',
    key: 'owner',
    format: {
      type: 'user',
    },
  },
  {
    label: 'amount',
    key: 'amount',
    format: {
      currency: getCurrencyByLocale(locale),
      type: 'currency',
    },
    sortable: true,
  },
  {
    label: 'ispay',
    key: 'ispay',
    format: {
      type: 'bool',
    },
    sortable: true,
  },
  {
    label: '',
    sortable: false,
    format: {},
    key: 'action',
  },
]
